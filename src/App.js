import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import index from './pages/index'

import './assets/scss/app.scss'
import NavbarHamburger from './components/NavbarHamburger'

import GeneralProvider from './contexts/GeneralContext'
import MapboxProvider from './contexts/MapboxContext'
import RecordProvider from './contexts/RecordContext'

function App() {
  return (
    <Router>
      <GeneralProvider>
        <MapboxProvider>
          <RecordProvider>
            <div className="App">
              <Switch>
                <Route exact path="/" component={index} />
              </Switch>

              <NavbarHamburger></NavbarHamburger>

            </div>
          </RecordProvider>
        </MapboxProvider>
      </GeneralProvider>
    </Router>
  );
}

export default App;