import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import GeneralProvider from './contexts/GeneralContext'
import MapboxProvider from './contexts/MapboxContext'
import RecordProvider from './contexts/RecordContext'

ReactDOM.render(
  <React.StrictMode>
    <GeneralProvider>
        <MapboxProvider>
          <RecordProvider>
            <App />
          </RecordProvider>
        </MapboxProvider>
      </GeneralProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
