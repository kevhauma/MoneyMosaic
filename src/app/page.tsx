'use client';

import Link from 'next/link';

const Home = () => {
  //useEffect(() => redirect('/start'), []);
  return (
    <>
      <Link replace href="/start">
        Start
      </Link>
    </>
  );
};

export default Home;
