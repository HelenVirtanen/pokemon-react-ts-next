import React from "react";
import { usePokemonData } from "./usePokemonData";

const GlobalContext = React.createContext();

// children = entire application
export const GlobalContextProvider = ({ children }) => {
  const {
    loading,
    fetchPokemon,
  } = usePokemonData();

  console.log("GlobalContextProvider");

  return (
    <GlobalContext.Provider
      value={{
        loading,
        fetchPokemon,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  return React.useContext(GlobalContext);
};
