import React from 'react';
import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import HeaderMenu from './header-menu';

const Header = () => {
  return (
    <header className='sticky inset-x-0 top-0 z-30 w-full transition-all border-b'>
      <div className='w-full max-w-screen-xl px-2.5 lg:px-20 relative mx-auto'>
        <div className='flex h-14 items-center justify-between'>
          <Link href={'/'}>
            <Image src='/logo.png' alt='Logo' width={100} height={100} />
          </Link>
          <div>
            <SignedOut>
              <SignInButton>
                <Button className='bg-black mr-2'>Sign In</Button>
              </SignInButton>
              <SignUpButton>
                <Button className='bg-black'>Sign Up</Button>
              </SignUpButton>
            </SignedOut>
            <SignedIn>
              <div className='flex justify-center items-center gap-4'>
                <HeaderMenu />
                <UserButton />
              </div>
            </SignedIn>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
