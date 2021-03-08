import { useEffect, useContext } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import index from './pages/index'

import MobileDetect from 'mobile-detect';

import './assets/scss/app.scss'
import NavbarHamburger from './components/NavbarHamburger'

import { GeneralContext } from './contexts/GeneralContext'

function App() {
  const { showDarkBg, onToggleHamburger, isMobile, setUserAgent } = useContext(GeneralContext)

  useEffect(() => {
    const userAgent = window.navigator.userAgent
    if (userAgent) {
      let ua = new MobileDetect(userAgent);
      setUserAgent(ua.mobile() ? true : false)
    }

  }, []);

  return (
    <Router basename={'/speed-measuring/'}>
      <div className={`App ${isMobile ? 'mobile' : ''}`}>
        <Switch>
          <Route exact path="/" component={index} />
        </Switch>

        <NavbarHamburger></NavbarHamburger>
        <div className={`${showDarkBg ? 'dark-bg' : ''}`} onClick={() => onToggleHamburger(false)}></div>
      </div>
    </Router>
  );
}

export default App;
