"use client";

import React, { useState, useEffect } from "react";
import Header from "../../../components/Header";
import { useGlobalContext } from "../../../context/globalContext";

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
    <div>
      <Header />
      {id && <p>Pokemon ID: {id}</p>}
    </div>
  );
}

export default Page;
