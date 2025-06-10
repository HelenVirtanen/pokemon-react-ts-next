"use client";

import React, { useState, useEffect, act } from "react";
import Header from "../../../components/Header";
import { useGlobalContext } from "../../../context/globalContext";
import Image from "next/image";
import { typeColor } from "../../../utils/colors";

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
        <div></div>
        <div className="relative flex justify-center items-center">
          <Image
            src={`/icons/${activePokemon?.types[0].type.name}.svg`}
            width={700}
            height={700}
            alt=""
            className="absolute opacity-15 top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]"
          />
        </div>
      </section>
    </main>
  );
}

export default Page;
