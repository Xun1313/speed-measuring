import { useState, createContext } from "react";

export const GeneralContext = createContext()

const GeneralProvider = props => {
  const [showDarkBg, setShowDarkBg] = useState(false)
  const [showHamburgerBar, setShowHamburgerBar] = useState(false)
  const [feature, setFeature] = useState('filterAddress')

  const onToggleHamburger = bool => {
    setShowHamburgerBar(bool)
    setShowDarkBg(bool)
  }

  const value = {
    showDarkBg,
    setShowDarkBg,
    showHamburgerBar,
    setShowHamburgerBar,
    feature,
    setFeature,
    onToggleHamburger
  }

  return (
    <GeneralContext.Provider value={value}>
      {props.children}
    </GeneralContext.Provider>
  );
}

export default GeneralProvider;