import React from "react";
import { usePokemonData } from "./usePokemonData";

const GlobalContext = React.createContext();

// children = entire application
export const GlobalContextProvider = ({ children }) => {
  const {
    loading,
    fetchPokemon,
    pokemonList,
    pokemonListDetails,
    fetchPokemonByName,
    activePokemon
  } = usePokemonData();

  console.log("GlobalContextProvider");

  return (
    <GlobalContext.Provider
      value={{
        loading,
        fetchPokemon,
        pokemonList,
        pokemonListDetails,
        fetchPokemonByName,
        activePokemon
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  return React.useContext(GlobalContext);
};
