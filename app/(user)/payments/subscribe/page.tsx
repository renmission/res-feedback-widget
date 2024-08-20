import SubmitButton from '@/components/submit-button';
import React from 'react';
import { monthlyPlanId, yearlyPlanId } from '@/lib/payment';
import SubscribeButton from '../subscribe-button';

const page = ({ searchParams }: { searchParams: { plan: string } }) => {
  const { plan } = searchParams;
  console.log(plan);

  const planId = plan === 'yearly' ? yearlyPlanId : monthlyPlanId;

  return (
    <div className='flex flex-col border p-4 rounded-md'>
      <h1 className='text-3xl font-bold mb-2'>Subscribe Now!</h1>
      <p className='font-semibold text-neutral-700 mb-2'>
        Start you subscription now.
      </p>
      <div>
        <SubscribeButton price={planId} />
      </div>
    </div>
  );
};

export default page;
