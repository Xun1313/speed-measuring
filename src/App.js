import { useState, useEffect } from "react";
import data from './data'
import Mapbox from './components/Mapbox'

function App() {
  useEffect(() => {
    //https://od.moi.gov.tw/api/v1/rest/datastore/A01010000C-000674-011
    setList(data.result.records)
  }, []);

  return (
    <div className="App">
      <Mapbox></Mapbox>
    </div>
  );
}

export default App;
