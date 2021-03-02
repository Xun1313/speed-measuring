import { useState, useEffect, useContext } from "react";
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'

import data from '../data'

import { MapboxContext } from '../contexts/MapboxContext'

const Mapbox = () => {
  // 資料列表
  const [list, setList] = useState([])
  // loading 開關
  const [loading, setLoading] = useState(true)
  // 儲存畫面上當下所有marker object
  const [markerList, setMarkerList] = useState([])
  // 儲存畫面上當下所有popup object
  const [popupList, setPopupList] = useState([])

  const { map, setMap } = useContext(MapboxContext)

  useEffect(() => {
    setList(data.result.records)

    navigator.geolocation.getCurrentPosition(position => {
      // 使用者同意
      onInitMap(position.coords.longitude, position.coords.latitude);
    }, err => {
      // 使用者按封鎖
      onInitMap(120.3232675, 22.6294885);
    });
  }, []);

  const onInitMap = (lng, lat) => {
    mapboxgl.accessToken = 'pk.eyJ1IjoiYWRhbXpob25nIiwiYSI6ImNrbGc3NTNmejUxbmgycHBsZzBsYnZ5MWYifQ.Z7ylxFjrj0dVnHlvrha8oA';
    const mapObj = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/adamzhong/cklirx7b402wu17s7g35r8jx2',
      center: [lng, lat],
      minZoom: 6,
      maxZoom: 18,
      zoom: 5,
    });
    setMap(mapObj)

    onGenerateIcons(mapObj);

    //顯示右上角的+- zoomin zoomout功能
    mapObj.addControl(new mapboxgl.NavigationControl());
    //顯示左下角的高空距離
    mapObj.addControl(new mapboxgl.ScaleControl({
      maxWidth: 70
    }));
    //顯示右上角的全螢幕觀看
    mapObj.addControl(new mapboxgl.FullscreenControl({
      container: 'map'
    }));

    mapObj.on('moveend', moveend);

    setLoading(false);
  }

  const onGenerateIcons = mapObj => {
    // todo: useState 無法在同個 function 立刻更新拿到值
    //產出 marker 和 popup 的 icon
    data.result.records.forEach(e => {
      // create a DOM element for the marker
      const el = document.createElement('div');
      el.className = e.limit <= 50 ? 'marker alert' : 'marker';
      el.textContent = e.limit

      var markerHeight = 40;
      const popup = new mapboxgl.Popup({ offset: {
          'top': [0, 0],
          'bottom': [0, -markerHeight],
      }, closeButton: false });

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

  const moveend = () => {
    //this.showSearch = true;
  }

  const onFlyTo = (lng, lat) => {
    // 移動位置
    map.flyTo({
      center: [lng, lat],
      zoom: 12
    })
  }

  const onFilter = (lng, lat) => {
    // 移動位置
    map.flyTo({
      center: [lng, lat],
      zoom: 12
    })
  }

  return (
    <div className="map">
      <div className="map-box" id="map"></div>
    </div>
  );
}

export default Mapbox;