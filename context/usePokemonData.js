import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import _ from "lodash";

const pokemonBaseUrl = "https://pokeapi.co/api/v2/";

export const usePokemonData = () => {
  const [loading, setLoading] = useState(false);
  const [pokemonList, setPokemonList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [allPokemons, setAllPokemons] = useState([]);
  const [pokemonListDetails, setPokemonListDetails] = useState([]);
  const [originalPokemonListDetails, setOriginalPokemonListDetails] = useState(
    []
  );
  const [activePokemon, setActivePokemon] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({
    type: "",
    ability: "",
    weight: "",
    height: "",
    sortOrder: "",
  });

  const fetchPokemon = async (page = 1) => {
    setLoading(true);
    try {
      const offset = (page - 1) * 20;
      const res = await axios.get(
        `${pokemonBaseUrl}/pokemon?offset=${offset}&limit=20`
      );

      setLoading(false);

      setPokemonList((prev) => [...prev, ...res.data.results]);
      setCurrentPage(page);
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

  // search pokemon by name
  const searchPokemonByName = async (query) => {
    if (!query) {
      setSearchQuery("");

      const details = await Promise.all(
        pokemonList.map(async (pokemon) => {
          const res = await axios.get(pokemon.url);
          return res.data;
        })
      );

      setPokemonListDetails(details);
      return;
    }

    setLoading(true);

    const filteredPokemon = allPokemons.filter((pokemon) => {
      return pokemon.name.toLowerCase().includes(query.toLowerCase());
    });

    try {
      // fetch details for filtered pokemon
      const filtered = await Promise.all(
        filteredPokemon.map(async (pokemon) => {
          const res = await axios.get(pokemon.url);
          return res.data;
        })
      );

      setLoading(false);
      setPokemonListDetails(filtered);
    } catch (error) {
      console.log(error);
    }
  };

  // filter pokemons
  const filterPokemon = () => {
    const { type, ability, weight, height, sortOrder } = filters;
    const query = searchQuery.toLowerCase();

    let filteredPokemon = originalPokemonListDetails;

    //apply the type filter
    if (type) {
      filteredPokemon = filteredPokemon.filter((pokemon) => {
        return pokemon.types.some((t) => t.type.name === type);
      });
    }

    //apply the ability filter
    if (ability) {
      filteredPokemon = filteredPokemon.filter((pokemon) => {
        return pokemon.abilities.some(
          (a) => a.ability.name === ability
        );
      });
    }

    //apply the weight filter
    if (weight) {
      filteredPokemon = filteredPokemon.filter((pokemon) => {
        return pokemon.weight === parseInt(weight);
      });
    }

    //apply the height filter
    if (height) {
      filteredPokemon = filteredPokemon.filter((pokemon) => {
        return pokemon.height >= height;
      });
    }

    //apply the searcg query
    if (query) {
      filteredPokemon = filteredPokemon.filter((pokemon) => {
        return pokemon.name.toLowerCase().includes(query);
      });
    }

    //apply the sort order
    if (sortOrder) {
      filteredPokemon =
        sortOrder === "asc"
          ? [...filteredPokemon].sort((a, b) => {
              return a.name.localeCompare(b.name, undefined, {
                sensitivity: "base",
              });
            })
          : [...filteredPokemon].sort((a, b) => {
              return b.name.localeCompare(a.name, undefined, {
                sensitivity: "base",
              });
            });
    }

    setPokemonListDetails(filteredPokemon);
  };

  const loadMore = () => {
    fetchPokemon(currentPage + 1);
  };

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value}));
  }

  const clearFilters = () => {
    setFilters({
      type: "",
      ability: "",
      weight: "",
      height: "",
      sortOrder: "",
    })
    setSearchQuery("");
    setPokemonListDetails(originalPokemonListDetails);
  }

  const debouncedSearch = _.debounce((value) => {
    setFilters((prev) => ({...prev, query: value }));
    filterPokemon();
    searchPokemonByName(value);
  }, 500);

  const handleSearchChange = (event) => {
    const value = event.target.value;
    setSearchQuery(value);
    debouncedSearch(value);
  };

  useEffect(() => {
    fetchPokemon();
    fetchAllPokemon();
  }, []);

  useEffect(() => {
    if (pokemonList.length > 0) {
      fetchPokemonDetails();
    }
  }, [pokemonList, fetchPokemonDetails]);

  useEffect(() => {
    filterPokemon();
  }, [filters, searchQuery])

  return {
    fetchPokemon,
    loading,
    pokemonList,
    pokemonListDetails,
    fetchPokemonByName,
    activePokemon,
    allPokemons,
    loadMore,
    searchQuery,
    handleSearchChange,
    handleFilterChange,
    filters,
    clearFilters
  };
};
