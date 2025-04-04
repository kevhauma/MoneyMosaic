'use client';
import { Flex } from '@/libs/shadCn';
import { PropsWithChildren } from 'react';
import { AppHeader } from './AppHeader';

export const StartLayout = ({ children }: PropsWithChildren) => {
  return (
    <Flex vertical className='max-h-screen h-screen w-full overflow-auto'>
      <div className="bg-slate-950 sticky z-10 top-0 w-full flex align-middle">
        <AppHeader></AppHeader>
      </div>
      <div className='flex-grow min-h-0'>{children}</div>
    </Flex>
  );
};
