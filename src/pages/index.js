import { useState, useEffect, useContext } from "react";

import MobileDetect from 'mobile-detect';

import { city, area } from "../assets/js/city";
import Mapbox from '../components/Mapbox'
import SearchPanel from '../components/SearchPanel'
import NavbarHamburger from '../components/NavbarHamburger'

import { GeneralContext } from '../contexts/GeneralContext'

function App() {
  // 使用者選擇的縣市
  const [county, setCounty] = useState('高雄市')
  // 使用者選擇的鄉鎮市
  const [district, setDistrict] = useState('')
  // 縣市對應鄉鎮市列表
  const [districtList, setDistrictList] = useState([])

  const { showDarkBg, onToggleHamburger, isMobile, setUserAgent } = useContext(GeneralContext)

  useEffect(() => {
    //https://od.moi.gov.tw/api/v1/rest/datastore/A01010000C-000674-011
    const userAgent = window.navigator.userAgent
    if (userAgent) {
      let ua = new MobileDetect(userAgent);
      setUserAgent(ua.mobile() ? true : false)
    }

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
    <div className={`${isMobile ? 'mobile' : ''}`}>
      <div className="map-container">
        <SearchPanel></SearchPanel>
        <Mapbox></Mapbox>
      </div>

      <NavbarHamburger></NavbarHamburger>
      <div className={`${showDarkBg ? 'dark-bg' : ''}`} onClick={() => onToggleHamburger(false)}></div>
    </div>
  );
}

export default App;
