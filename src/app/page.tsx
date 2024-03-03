'use client';
import { CenteredCircularProgress } from '@/libs/ui';
import Link from 'next/link';

const Home = () => {
  //useEffect(() => redirect('/start'), []);
  return (
    <>
      <Link replace href="/start">
        Start
      </Link>
      <CenteredCircularProgress />
    </>
  );
};

export default Home;
