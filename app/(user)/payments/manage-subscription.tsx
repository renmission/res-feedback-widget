'use client';

import React, { useState } from 'react';
import { getStripe } from '@/lib/stripe-client';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

const ManageSubscription = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const redirectToCustomerPortal = async () => {
    setLoading(true);
    try {
      const { url } = await fetch('/api/stripe/create-portal', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      }).then((res) => res.json());

      router.push(url.url);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <Button
      onClick={redirectToCustomerPortal}
      disabled={loading}
      className='hover:bg-indigo-700'
    >
      {loading ? (
        <>
          <Loader2 className='mr-2 h-4 w-4 animate-spin' />
          <span>Please wait...</span>
        </>
      ) : (
        'Modify Your Subscription'
      )}
    </Button>
  );
};

export default ManageSubscription;
