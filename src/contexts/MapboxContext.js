import { useState, useContext, createContext } from "react";
import { GeneralContext } from '../contexts/GeneralContext'
import data from '../data'
import mapboxgl from 'mapbox-gl'
// eslint-disable-next-line import/no-webpack-loader-syntax
mapboxgl.workerClass = require('worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker').default;

export const MapboxContext = createContext()

const MapboxProvider = props => {
  // 所有資料列表
  const [list, setList] = useState(data.result.records)
  // 使用者篩選的資料列表
  const [userList, setUserList] = useState([])
  // map object
  const [map, setMap] = useState({})
  const [theme, setTheme] = useState('street')
  // 儲存畫面上當下所有marker object
  const [markerList, setMarkerList] = useState([])
  // 儲存畫面上當下所有popup object
  const [popupList, setPopupList] = useState([])

  const { setFeature, setSearchStatus } = useContext(GeneralContext)

  const onGetApi = () => {
    // 取得 api 資料
    setList(data.result.records)
  }

  const onFilterAddress = (city = [], area = [], highway = true) => {
    // 篩選地址
    setSearchStatus('loading')
    onResetMarkerPopup()

    // 是否要搜尋國道
    //const searchHighway = highway ? `e.CityName.includes('國道')` : true
    const result = list.filter(e => e.CityName === city[0] && area.includes(e.RegionName)/*  && searchHighway */)
    setUserList(result)

    onGenerateIcons(map, result)
    
    setFeature('filterAddressResult')
    setSearchStatus('cross')
    //result.length > 0 ? setFeature('filterAddressResult') : setFeature(null)
  }

  const onFlyto = (longitude, latitude) => {
    // 前往該地點
    map.flyTo({
      center: [longitude, latitude],
      zoom: 12
    })

    markerList.forEach(e => {
      // 關閉已打開的 popup
      if (e.getPopup().isOpen()) e.togglePopup()

      // 開啟符合的位置的 popup
      const {lng, lat} = e.getLngLat()
      if (lng == longitude && lat == latitude) e.togglePopup()
    })
  }

  const onChangeTheme = (value = 'street') => {
    // 變更地圖主題
    const themeList = {
      street: 'mapbox://styles/adamzhong/cklirx7b402wu17s7g35r8jx2',
      dark: 'mapbox://styles/adamzhong/cklirmfxf07vo17rr8vm3folo',
      satellite: 'mapbox://styles/adamzhong/cklg7g8mp5xzv17noz591r3bw'
    }
    map.setStyle(themeList[value])
    setTheme(value)
  }

  const onGenerateIcons = (mapObj, dataList) => {
    // todo: useState 無法在同個 function 立刻更新拿到值
    //產出 marker 和 popup 的 icon
    dataList.forEach(e => {
      // create a DOM element for the marker
      const el = document.createElement('div');
      el.className = e.limit <= 50 ? 'marker alert' : 'marker';
      el.textContent = e.limit

      var markerHeight = 40;
      const popup = new mapboxgl.Popup({ offset: {
          'top': [0, 0],
          'bottom': [0, -markerHeight],
      }, closeButton: false });

      //todo: 把警察icon引進接在變數上轉成html??
      // add marker to map
      popup.setHTML(`
      <div class="popup-content">
        <div class="name">設置縣市: ${e.CityName}</div>
        <div class="cat">設置市區鄉鎮: ${e.RegionName}</div>
        <div class="cat">設置地址: ${e.Address}</div>
        <div class="cat">管轄警局: ${e.DeptNm}</div>
        <div class="cat">管轄分局: ${e.BranchNm}</div>
        <div class="cat">拍攝方向: ${e.direct}</div>
      </div>`);
      setPopupList(prev => [...prev, popup])

      const marker = new mapboxgl.Marker({element: el, anchor: 'bottom'})
        .setLngLat([e.Longitude, e.Latitude])
        .setPopup(popup) // add popups
        .addTo(mapObj);
      setMarkerList(prev => [...prev, marker])
    });
  }

  const onResetMarkerPopup = () => {
    // 清除地圖上的 marker 和 popup
    setMarkerList(prev => {
      prev.forEach(e => e.remove())
      return []
    })
    setPopupList(prev => {
      prev.forEach(e => e.remove())
      return []
    })
  }

  const value = {
    list,
    userList,
    theme,
    map,
    setMap,
    markerList,
    setMarkerList,
    popupList,
    setPopupList,
    onChangeTheme,
    onGetApi,
    onFilterAddress,
    onGenerateIcons,
    onFlyto
  }

  return (
    <MapboxContext.Provider value={value}>
      {props.children}
    </MapboxContext.Provider>
  );
}

export default MapboxProvider;