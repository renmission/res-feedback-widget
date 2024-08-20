'use client';

import { Copy, Check } from 'lucide-react';
import React, { useState } from 'react';
import { Button } from './ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

const CopyButton = ({ text }: { text: string }) => {
  const [copied, setCopied] = useState('Copy');

  const copyToClipBoard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied('Copied');
    });
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            onClick={() => copyToClipBoard(text)}
            className='text-slate-50 absolute p-2 right-0 top-0'
          >
            {copied === 'Copied' ? <Check /> : <Copy />}
          </button>
        </TooltipTrigger>
        <TooltipContent>
          <p>{copied}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default CopyButton;
