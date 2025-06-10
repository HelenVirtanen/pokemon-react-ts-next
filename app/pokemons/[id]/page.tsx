"use client";

import React, { useState, useEffect } from "react";
import Header from "../../../components/Header";
import { useGlobalContext } from "../../../context/globalContext";
import Image from "next/image";
import { typeColor } from "../../../utils/colors";
import { volumeHigh } from "../../../utils/icons";

function Page({ params }: { params: Promise<{ id: string }> }) {
  const [id, setId] = useState<string | null>(null);

  console.log("Id is:", id);

  const { fetchPokemonByName, loading, activePokemon } = useGlobalContext();

  useEffect(() => {
    params.then((resolvedParams) => {
      setId(resolvedParams.id);
    });
  }, [params]);

  useEffect(() => {
    if (id) {
      fetchPokemonByName(id);
    }
  }, [id, fetchPokemonByName]);

  console.log("activePokemon", activePokemon);

  return (
    <main>
      <Header />
      <section
        className="px-16 py-8 min-h-[90vh] grid grid-cols-1 md:grid-cols-2 gap-8"
        style={{
          backgroundColor:
            typeColor[
              activePokemon?.types[
                Math.floor(Math.random() * activePokemon?.types.length)
              ].type.name
            ],
        }}
      >
        <div className="flex flex-col justify-center gap-6">
          <div className="flex flex-col gap-1">
            <div className="flex gap-4">
              <button
                className="px-4 py-2 flex items-center gap-2 text-sm font-bold bg-white text-[#4192fd] rounded-full
              hover:bg-white/90 transition-all duration-200 ease-in-out"
                onClick={() => {
                  const audio = new Audio(activePokemon?.cries.legacy);
                  audio.play();
                }}
              >
                {volumeHigh} Old cry
              </button>
              <button
                className="px-4 py-2 flex items-center gap-2 text-sm font-bold bg-white text-[#4192fd] rounded-full
              hover:bg-white/90 transition-all duration-200 ease-in-out"
                onClick={() => {
                  const audio = new Audio(activePokemon?.cries.latest);
                  audio.play();
                }}
              >
                {volumeHigh} New cry
              </button>
            </div>
            <h1 className="text-6xl font-bold capitalize text-[#4203b2] drop-shadow-sm">
              {activePokemon?.name}
            </h1>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="flex flex-col gap-2">
              <h2 className="text-2xl font-bold">Abilities</h2>
              <ul className="flex gap-2">
                {activePokemon?.abilities.map((ability:any, index:number) => (
                  <li key={index} className="px-4 py-2 flex items-center gap-2 text-sm font-bold bg-white text-[#4203b2] rounded-full">{ability.ability.name}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="relative flex justify-center items-center">
          <Image
            src={`/icons/${activePokemon?.types[0].type.name}.svg`}
            width={700}
            height={700}
            alt="Icon of pokemon type"
            className="absolute opacity-15 top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]"
          />

          <Image
            src={
              activePokemon?.sprites?.other["official-artwork"]
                ?.front_default ||
              activePokemon?.sprites?.other?.home?.front_default ||
              activePokemon?.sprites?.other?.home?.front_shiny ||
              activePokemon?.sprites?.other["dream_world"]?.front_default
            }
            alt="pokemon image"
            width={500}
            height={500}
            className="relative z-10 filter drop-shadow-lg"
          />
        </div>
      </section>
    </main>
  );
}

export default Page;
