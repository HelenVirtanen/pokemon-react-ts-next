import { useEffect, useState } from "react";
import axios from "axios";

const pokemonBaseUrl = "https://pokeapi.co/api/v2/";

export const usePokemonData = () => {
  const [loading, setLoading] = useState(false);
  const fetchPokemon = async (page = 1) => {
    setLoading(true);
    try {
      const offset = (page - 1) * 50;
      const res = await axios.get(
        `${pokemonBaseUrl}/pokemon?limit=20&offset=${offset}`
      );

      console.log(res.data.results);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchPokemon();
  }, []);

  return { fetchPokemon, loading };
};
