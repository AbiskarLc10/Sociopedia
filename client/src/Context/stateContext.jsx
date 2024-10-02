import { createContext, useState } from "react";

export const stateContext = createContext();

export const Contexts = ({ children }) => {
  
 const [login,setLogin] = useState(false);
 const [toggleProfile, setToggleProfile] = useState(false);

  return (
    <stateContext.Provider value={{ login,setLogin,toggleProfile,setToggleProfile }}>{children}</stateContext.Provider>
  );
};
