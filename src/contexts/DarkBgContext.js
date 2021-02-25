import { useState, createContext } from "react";

export const DarkBgContext = createContext()

const DarkBgProvider = props => {
  const [showDarkBg, setShowDarkBg] = useState(false)

  return (
    <DarkBgContext.Provider value={{showDarkBg, setShowDarkBg}}>
      {props.children}
    </DarkBgContext.Provider>
  );
}

export default DarkBgProvider;