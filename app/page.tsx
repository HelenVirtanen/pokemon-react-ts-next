'use client';

import Header from '../components/Header';
import { useGlobalContext } from '../context/globalContext';
import { useUser } from '@auth0/nextjs-auth0';

export default function Home() {
  const { isLoading } = useUser();
  const { pokemonListDetails, loading } = useGlobalContext();

  if (loading) {
    return <div>Loading pokemons...</div>
  }

  return (
  <main>
    <Header />

    <section>
      { }
    </section>

    <section className='min-h-[91vh]'>
      <div className='px-16  py=8 grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>{
        !loading && pokemonListDetails.map((pokemon: any, index: number) => {
          return <div key={index}></div>
        })}</div>
    </section>
  </main>
  );
}
