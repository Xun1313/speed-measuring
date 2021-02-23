import { useState, useEffect } from "react";
import 'bootstrap/scss/bootstrap-reboot.scss'
import 'bootstrap/scss/bootstrap-grid.scss'

import data from './data'
import Mapbox from './components/Mapbox/index'

function App() {
  // 資料列表
  const [list, setList] = useState([])

  useEffect(() => {
    //https://od.moi.gov.tw/api/v1/rest/datastore/A01010000C-000674-011
    setList(data.result.records)
  }, []);

  return (
    <div className="App">
      <Mapbox list={list}></Mapbox>
    </div>
  );
}

export default App;
