import React from 'react';
import Laoding from './laoding';
import { Suspense } from 'react';

const UserLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='container w-full max-w-screen-xl mx-auto py-10 px-2.5 lg:px-20'>
      <Suspense fallback={<Laoding />}>{children}</Suspense>
    </div>
  );
};

export default UserLayout;
