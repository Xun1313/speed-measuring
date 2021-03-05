import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import index from './pages/index'

import './assets/scss/app.scss'

import GeneralProvider from './contexts/GeneralContext'
import MapboxProvider from './contexts/MapboxContext'
import RecordProvider from './contexts/RecordContext'

function App() {
  return (
    <Router basename={'/speed-measuring/'}>
      <GeneralProvider>
        <MapboxProvider>
          <RecordProvider>
            <div className="App">
              <Switch>
                <Route exact path="/" component={index} />
              </Switch>

            </div>
          </RecordProvider>
        </MapboxProvider>
      </GeneralProvider>
    </Router>
  );
}

export default App;
