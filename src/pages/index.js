import { useState, useEffect } from "react";

import { city, area } from "../assets/js/city";
import Mapbox from '../components/Mapbox'
import SearchPanel from '../components/SearchPanel'

function App() {
  // 使用者選擇的縣市
  const [county, setCounty] = useState('高雄市')
  // 使用者選擇的鄉鎮市
  const [district, setDistrict] = useState('')
  // 縣市對應鄉鎮市列表
  const [districtList, setDistrictList] = useState([])

  useEffect(() => {
    //https://od.moi.gov.tw/api/v1/rest/datastore/A01010000C-000674-011

    onChangeCity(county)
  }, []);

  const onChangeCity = value => {
    // 選擇縣市
    setCounty(value)
    setDistrict('')

    const filter = area.filter(e => e.city === value)
    const result = filter.map(e => e.area)
    setDistrictList(result)
  }

  return (
    <div className="map-container">
      <SearchPanel></SearchPanel>
      <Mapbox></Mapbox>
    </div>
  );
}

export default App;
