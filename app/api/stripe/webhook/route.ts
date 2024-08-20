import Stripe from 'stripe';
import { stripe } from '@/lib/stripe';
import {
  createSubscription,
  cancelSubscription,
} from '@/actions/userSubscriptions';

const relevantEvents = new Set([
  'checkout.session.completed',
  'customer.subscription.created',
  'customer.subscription.deleted',
]);

export async function POST(req: Request) {
  const body = await req.text();
  const sig = req.headers.get('Stripe-Signature') as string;
  const webhookSecret =
    process.env.NODE_ENV === 'production'
      ? process.env.STRIPE_WEBHOOK_SECRET
      : process.env.STRIPE_WEBHOOK_LOCAL_SECRET;

  if (!webhookSecret) {
    return new Response('Webhook secret not set', { status: 400 });
  }

  if (!sig) {
    return new Response('No signature', { status: 400 });
  }

  const event = stripe.webhooks.constructEvent(body, sig, webhookSecret);

  const data = event.data.object as Stripe.Subscription;

  if (relevantEvents.has(event.type)) {
    switch (event.type) {
      case 'customer.subscription.created':
        await createSubscription({ stripeCustomerId: data.customer as string });
        break;
      case 'customer.subscription.deleted':
        await cancelSubscription({ stripeCustomerId: data.customer as string });
        break;
    }
  }

  return new Response(JSON.stringify({ received: true }), { status: 200 });
}
