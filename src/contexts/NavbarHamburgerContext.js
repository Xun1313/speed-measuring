import { useState, createContext } from "react";

export const NavbarHamburgerContext = createContext()

const NavbarHamburgerProvider = props => {
  const [showHamburgerBar, setShowHamburgerBar] = useState(false)

  return (
    <NavbarHamburgerContext.Provider value={{showHamburgerBar, setShowHamburgerBar}}>
      {props.children}
    </NavbarHamburgerContext.Provider>
  );
}

export default NavbarHamburgerProvider;