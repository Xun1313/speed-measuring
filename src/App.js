import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import index from './pages/index'

import './assets/scss/app.scss'
import NavbarHamburger from './components/NavbarHamburger'

import NavbarHamburgerProvider from './contexts/NavbarHamburgerContext'
import DarkBgContextProvider from './contexts/DarkBgContext'

function App() {
  return (
    <Router>
      <NavbarHamburgerProvider>
        <DarkBgContextProvider>
          <div className="App">
            <Switch>
              <Route exact path="/" component={index} />
            </Switch>

            <NavbarHamburger></NavbarHamburger>

          </div>
        </DarkBgContextProvider>
      </NavbarHamburgerProvider>
    </Router>
  );
}

export default App;
