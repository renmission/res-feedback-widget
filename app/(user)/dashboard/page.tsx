import NewProject from '@/components/new-project';
import React from 'react';
import { db } from '@/db';
import { projects } from '@/db/schema';
import { auth, currentUser } from '@clerk/nextjs/server';
import ProjectList from './projects-list';
import { eq } from 'drizzle-orm';
import { getSubscription } from '@/actions/userSubscriptions';
import { maxFreeProjects } from '@/lib/payment';

const Dashboard = async () => {
  const { userId } = auth();

  if (!userId) return null;

  const userProjects = await db
    .select()
    .from(projects)
    .where(eq(projects.userId, userId));

  const subscribed = await getSubscription({ userId });

  return (
    <div className='w-full'>
      <div className='flex justify-between items-center'>
        <h1 className='text-3xl font-bold my-4'>Project Lists</h1>
        {subscribed !== true && userProjects.length < maxFreeProjects ? (
          <NewProject />
        ) : null}
      </div>
      <ProjectList projects={userProjects} subscribed={subscribed} />
    </div>
  );
};

export default Dashboard;
