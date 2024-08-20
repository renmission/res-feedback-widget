'use client';

import React, { useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Menu, X, Folder, CreditCard } from 'lucide-react';
import { Button } from './ui/button';
import Link from 'next/link';

const HeaderMenu = () => {
  const [open, setOpen] = useState(false);

  const toggleMenu = () => {
    setOpen((prevOpen) => !prevOpen);
  };
  return (
    <DropdownMenu open={open} onOpenChange={toggleMenu}>
      <DropdownMenuTrigger asChild>
        <Button onClick={toggleMenu} className='m-10' variant='secondary'>
          {open ? <X className='h-6 w-6' /> : <Menu className='h-6 w-6' />}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-56'>
        <Link href={`/dashboard`}>
          <DropdownMenuItem asChild>
            <div className='flex gap-2 cursor-pointer'>
              <Folder className='h-4 w-4' />
              <span>Projects</span>
            </div>
          </DropdownMenuItem>
        </Link>
        <Link href={`/payments`}>
          <DropdownMenuItem asChild>
            <div className='flex gap-2 cursor-pointer'>
              <CreditCard className='h-4 w-4' />
              <span>Billing</span>
            </div>
          </DropdownMenuItem>
        </Link>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default HeaderMenu;
