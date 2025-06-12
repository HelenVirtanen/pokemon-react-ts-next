import React, { useEffect } from "react";
import { usePokemonData } from "./usePokemonData";
import { useUserData } from "./useUserData";
import { useUser } from "@auth0/nextjs-auth0";

const GlobalContext = React.createContext();

// children = entire application
export const GlobalContextProvider = ({ children }) => {
  const { user } = useUser();
  const {
    loading,
    fetchPokemon,
    pokemonList,
    pokemonListDetails,
    fetchPokemonByName,
    activePokemon,
    loadMore,
    allPokemons,
    searchQuery,
    handleSearchChange
  } = usePokemonData();

  const { userDetails, performAction, fetchUserDetails } = useUserData();

  useEffect(() => {
    console.log("User in global context:", user);
    if (user) {
      fetchUserDetails();
    }
  }, [user]);

  useEffect(() => {
    if (userDetails) {
      console.log("Updated user details in global context:", userDetails);
    }
  }, [userDetails]);

  return (
    <GlobalContext.Provider
      value={{
        loading,
        fetchPokemon,
        pokemonList,
        pokemonListDetails,
        fetchPokemonByName,
        activePokemon,
        loadMore,
        allPokemons,
        userDetails,
        performAction,
        searchQuery,
        handleSearchChange
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  return React.useContext(GlobalContext);
};
