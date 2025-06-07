import React from "react";

const GlobalContext = React.createContext();

// children = entire application
export const GlobalContextProvider = ({ children }) => {
const [state, setState] = React.useState();
  console.log("GlobalContextProvider");

  return (
    <GlobalContext.Provider value={{ state, setState }}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  return React.useContext(GlobalContext);
};
