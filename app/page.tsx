"use client";

import Header from "../components/Header";
import PokemonCard from "../components/PokemonCard";
import { useGlobalContext } from "../context/globalContext";
import { useUser } from "@auth0/nextjs-auth0";
import { arrowAngleDown } from "../utils/icons";

export default function Home() {
  const { isLoading } = useUser();
  const { pokemonListDetails, loading, allPokemons, loadMore } = useGlobalContext(); 

  return (
    <main className="bg-amber-200">
      <Header />

      <section>{}</section>

      <section className="min-h-[91vh] mt-8">
        <div className="px-16  py=8 grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {!loading &&
            pokemonListDetails.map((pokemon: any, index: number) => {
              return <PokemonCard key={index} pokemon={pokemon} />;
            })}
        </div>
      </section>
      
      {pokemonListDetails.length < allPokemons.length && (
        <div className="mt-4 pb-10 flex items-center justify-center">
          <button onClick={loadMore} className="py-2 px-6 flex items-center gap-2 bg-[#2f70b7] text-white rounded-full shadow-md font-medium
            hover:bg-[#562fb7] transition-all duration-200 ease-in-out">
            <span className="text-left text-lg">{arrowAngleDown}</span>Load More
          </button>
        </div>
      )}
    </main>
  );
}
