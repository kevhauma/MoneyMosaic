'use client';
import { CenteredCircularProgress } from '@/libs/ui';
import { redirect } from 'next/navigation';
import { useEffect } from 'react';

const Home = () => {
  useEffect(() => redirect('/start'), []);
  return (
    <>
      <CenteredCircularProgress />
    </>
  );
};

export default Home;
