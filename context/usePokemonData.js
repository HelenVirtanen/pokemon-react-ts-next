import { useEffect, useState, useCallback } from "react";
import axios from "axios";

const pokemonBaseUrl = "https://pokeapi.co/api/v2/";

export const usePokemonData = () => {
  const [loading, setLoading] = useState(false);
  const [pokemonList, setPokemonList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [allPokemons, setAllPokemons] = useState([]);
  const [pokemonListDetails, setPokemonListDetails] = useState([]);
  const [originalPokemonListDetails, setOriginalPokemonListDetails] = useState([]);
  const [activePokemon, setActivePokemon] = useState(null);

  const fetchPokemon = async (page = 1) => {
    setLoading(true);
    try {
      const offset = (page - 1) * 50;
      const res = await axios.get(
        `${pokemonBaseUrl}/pokemon?limit=10&offset=${offset}`
      );

      setLoading(false);

      setPokemonList((prev) => [...prev, ...res.data.results]);
      setCurrentPage(page);

      console.log(res.data.results);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchAllPokemon = async () => {
    try {
      const res = await axios.get(`${pokemonBaseUrl}/pokemon?limit=1302`);
      setAllPokemons(res.data.results);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchPokemonDetails = useCallback(async () => {
    setLoading(true);
    try {
      const details = await Promise.all(
        pokemonList.map(async (pokemon) => {
          const res = await axios.get(pokemon.url);

          return res.data;
        })
      );

      setLoading(false);

      setPokemonListDetails(details);

      //preserve the original pokemon list;
      setOriginalPokemonListDetails(details);
    } catch (error) {
      console.log("Error fetching pokemon details", error);
    }
  }, [pokemonList]);

  const fetchPokemonByName = useCallback(async (name) => {
    setLoading(true);
    try {  
      const res = await axios.get(`${pokemonBaseUrl}/pokemon/${name}`);
      setLoading(false);
      setActivePokemon(res.data);

      return res.data;
    } catch (error) {
      console.log("Error fetching pokemon by name", error);
    }
  }, []);

  useEffect(() => {
    fetchPokemon();
    fetchAllPokemon();
  }, []);

  useEffect(() => {
    if (pokemonList.length > 0) {
      fetchPokemonDetails();
    }
  }, [pokemonList, fetchPokemonDetails]);

  return {
    fetchPokemon,
    loading,
    pokemonList,
    pokemonListDetails,
    fetchPokemonByName,
    activePokemon
  };
};
