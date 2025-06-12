"use client";
import { useState, useEffect } from 'react';
import React from 'react';
import Header from '../../components/Header';
import { useGlobalContext } from '../../context/globalContext';
import PokemonCard from '../../components/PokemonCard';

function Page() {
  const { fetchPokemonByName, userDetails } = useGlobalContext();
  const [ likedPokemons, setLikedPokemons] = useState([]);
  const [ loading, setLoading] = useState(true);

  useEffect(() => {
    if (userDetails?.user?.liked) {
      setLoading(true);
      const fetchPokemons = async () => {
        const pokemonDetails = await Promise.all(
          userDetails.user?.liked.map(async (pokemon: any) => {
            const details = await fetchPokemonByName(pokemon);

            return details;
          })
        );

        setLikedPokemons(pokemonDetails as any);
      };
      fetchPokemons();
      setLoading(false);
    }
  }, [userDetails?.user?.liked, fetchPokemonByName]);

  if (loading) {
    return (
      <div className="h-[100vh] flex justify-center items-center">
        <div className="loader"></div>
      </div>
    );
  }

  return (
    <main>
      <Header />

      {!loading && (
        <section className="min-h-[91vh]">
          {likedPokemons.length > 0 ? (
            <div className="px-16 py-8 grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {likedPokemons.map((pokemon: any, index: number) => (
                <PokemonCard key={pokemon.name + index} pokemon={pokemon} />
              ))}
            </div>
          ) : (
            <h2 className="text-center text-2xl font-bold text-gray-800 mt-20">
              No liked pokemons
            </h2>
          )}
        </section>
      )}
    </main>
  );
}

export default Page