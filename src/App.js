import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import index from './pages/index'

import './assets/scss/app.scss'
import NavbarHamburger from './components/NavbarHamburger'

import GeneralProvider from './contexts/GeneralContext'
import MapboxProvider from './contexts/MapboxContext'

function App() {
  return (
    <Router>
      <GeneralProvider>
        <MapboxProvider>

        <div className="App">
          <Switch>
            <Route exact path="/" component={index} />
          </Switch>

          <NavbarHamburger></NavbarHamburger>

        </div>
        </MapboxProvider>
      </GeneralProvider>
    </Router>
  );
}

export default App;
