'use client';
import '@/feature-dates';
import '@/feature-i18n';
import { ReactNode } from 'react';
import { RecoilRoot } from 'recoil';


type LayoutProps = {
  children: ReactNode;
};

export const Layout = ({ children }: LayoutProps) => {
  return (
      <RecoilRoot>
        <div className='bg-slate-900 text-secondary flex h-full max-h-full w-screen max-w-screen'>{children}</div>
      </RecoilRoot>
  );
};
