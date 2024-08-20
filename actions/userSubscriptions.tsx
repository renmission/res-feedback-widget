import { db } from '@/db';
import { subscriptions } from '@/db/schema';
import { eq } from 'drizzle-orm';
import React from 'react';

export const createSubscription = async ({
  stripeCustomerId,
}: {
  stripeCustomerId: string;
}) => {
  await db
    .update(subscriptions)
    .set({ subscribed: true })
    .where(eq(subscriptions.stripeCustomerId, stripeCustomerId));
};

export const cancelSubscription = async ({
  stripeCustomerId,
}: {
  stripeCustomerId: string;
}) => {
  await db
    .update(subscriptions)
    .set({ subscribed: false })
    .where(eq(subscriptions.stripeCustomerId, stripeCustomerId));
};

export const getSubscription = async ({ userId }: { userId: string }) => {
  const userSubscription = await db.query.subscriptions.findFirst({
    where: eq(subscriptions.userId, userId),
  });

  return userSubscription?.subscribed;
};
