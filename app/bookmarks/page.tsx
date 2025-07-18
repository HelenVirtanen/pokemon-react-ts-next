"use client";
import { useState, useEffect } from 'react';
import React from 'react';
import Header from '../../components/Header';
import { useGlobalContext } from '../../context/globalContext';
import PokemonCard from '../../components/PokemonCard';

function Page() {
  const { fetchPokemonByName, userDetails } = useGlobalContext();
  const [ bookmarkedPokemons, setBookmarkedPokemons] = useState([]);
  const [ loading, setLoading] = useState(true);

  useEffect(() => {
    if (userDetails?.user?.bookmarks) {
      setLoading(true);
      const fetchPokemons = async () => {
        const pokemonDetails = await Promise.all(
          userDetails?.user?.bookmarks.map(async (pokemon: any) => {
            const details = await fetchPokemonByName(pokemon);

            return details;
          })
        );

        setBookmarkedPokemons(pokemonDetails as any);
      };
      fetchPokemons();
      setLoading(false);
    }
  }, [userDetails?.user?.bookmarks, fetchPokemonByName]);

  if (loading) {
    return (
      <div className="h-[100vh] flex justify-center items-center">
        <div className="loader"></div>
      </div>
    );
  }

  return (
    <main className="bg-orange-300">
      <Header />

      {!loading && (
        <section className="min-h-[91vh]">
          {bookmarkedPokemons.length > 0 ? (
            <div className="px-16 py-8 grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {bookmarkedPokemons.map((pokemon: any, index: number) => (
                <PokemonCard key={pokemon.name + index} pokemon={pokemon} />
              ))}
            </div>
          ) : (
            <h2 className="text-center text-2xl font-bold text-gray-800 mt-20">
              No bookmarked pokemons
            </h2>
          )}
        </section>
      )}
    </main>
  );
}

export default Page