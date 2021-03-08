import { useState, createContext } from "react";

export const GeneralContext = createContext()

const GeneralProvider = props => {
  const [showDarkBg, setShowDarkBg] = useState(true)
  const [showHamburgerBar, setShowHamburgerBar] = useState(false)
  const [feature, setFeature] = useState('filterAddress')
  const [searchStatus, setSearchStatus] = useState('camera')
  const [isMobile, setUserAgent] = useState(false)

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
    searchStatus,
    setSearchStatus,
    isMobile,
    setUserAgent,
    onToggleHamburger
  }

  return (
    <GeneralContext.Provider value={value}>
      {props.children}
    </GeneralContext.Provider>
  );
}

export default GeneralProvider;