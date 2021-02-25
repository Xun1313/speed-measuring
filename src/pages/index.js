import { useState, useEffect, useContext } from "react";

import { city, area } from "../assets/js/city";
import data from '../data'
import Mapbox from '../components/Mapbox'
import SearchPanel from '../components/SearchPanel'

import { NavbarHamburgerContext } from '../contexts/NavbarHamburgerContext'
import { DarkBgContext } from '../contexts/DarkBgContext'

function App() {
  // 資料列表
  const [list, setList] = useState([])
  // 使用者選擇的縣市
  const [county, setCounty] = useState('高雄市')
  // 使用者選擇的鄉鎮市
  const [district, setDistrict] = useState('')
  // 縣市對應鄉鎮市列表
  const [districtList, setDistrictList] = useState([])

  const { setShowHamburgerBar } = useContext(NavbarHamburgerContext)
  const { showDarkBg, setShowDarkBg }  = useContext(DarkBgContext)
  //console.log(showDarkBg);

  useEffect(() => {
    //https://od.moi.gov.tw/api/v1/rest/datastore/A01010000C-000674-011
    setList(data.result.records)

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

  const onSearch = () => {
    // 搜尋
    //const result = list.filter(e => )
  }

  const onToggleHamburger = () => {
    setShowHamburgerBar(false)
    setShowDarkBg(false)
  }

  return (
    <>
      {/* <div className="banner">
        <div className="box">
          <h1 className="font-size-28">全台測速照相</h1>
          <h2 className="font-size-22">地圖搜尋</h2>

          <div className="mb-2">
            <select onChange={e => onChangeCity(e.target.value)}>
              {city.map(e => <option key={e} value={e}>{e}</option>)}
            </select>
          </div>

          <div className="mb-2">
            <select onChange={e => setDistrict(e.target.value)}>
              <option value="">鄉鎮市區</option>
              {districtList.map(e => <option key={e} value={e}>{e}</option>)}
            </select>
          </div>

          <button type="button" className="btn btn-bg-blue btn-small" onClick={onSearch}>搜尋</button>
        </div>
      </div> */}
      <div className="map-container">
        <SearchPanel></SearchPanel>
        <Mapbox list={list}></Mapbox>
      </div>

      <div className={`${showDarkBg ? 'dark-bg' : ''}`} onClick={onToggleHamburger}></div>
    </>
  );
}

export default App;
