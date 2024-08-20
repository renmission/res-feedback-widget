import { stripe } from '@/lib/stripe';
import { auth } from '@clerk/nextjs/server';
import { db } from '@/db';
import { subscriptions } from '@/db/schema';
import { eq } from 'drizzle-orm';

type CustomerDataProps = {
  metadata: {
    dbId: string;
  };
};

export async function POST(req: Request) {
  const { userId } = auth();

  if (!userId) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401,
    });
  }

  const userSubscription = await db.query.subscriptions.findFirst({
    where: eq(subscriptions.userId, userId),
  });

  let customer;

  if (userSubscription) {
    customer = { id: userSubscription.stripeCustomerId };
  } else {
    const customerData: CustomerDataProps = {
      metadata: {
        dbId: userId,
      },
    };

    const response = await stripe.customers.create(customerData);

    customer = { id: response.id };

    await db.insert(subscriptions).values({
      userId,
      stripeCustomerId: customer.id,
    });
  }

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

  if (!customer?.id) {
    return new Response(
      JSON.stringify({ error: 'Failed to create customer' }),
      {
        status: 500,
      }
    );
  }

  try {
    const url = await stripe.billingPortal.sessions.create({
      customer: customer.id,
      return_url: `${baseUrl}/payments`,
    });

    if (url) {
      return new Response(JSON.stringify({ url }), {
        status: 200,
      });
    } else {
      return new Response(
        JSON.stringify({ error: 'Failed to create a portal' }),
        {
          status: 500,
        }
      );
    }
  } catch (error) {
    console.log(error);
    return new Response(
      JSON.stringify({ error: 'Failed to create a portal' }),
      {
        status: 500,
      }
    );
  }
}
