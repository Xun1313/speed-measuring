import { useState, useEffect } from "react";
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import './assets/index.scss'
import iconPath from '../../assets/img/mark.png'
//const iconPath = require('../../assets/img/mark.png')

const Mapbox = ({list}) => {
  // 資料列表
  const [dataList, setDataList] = useState(list)
  // loading 開關
  const [loading, setLoading] = useState(true)
  // 儲存畫面上當下所有marker object
  const [markerList, setMarkerList] = useState([])
  // 儲存畫面上當下所有popup object
  const [popupList, setPopupList] = useState([])
  // map object
  const [map, setMap] = useState('')

  useEffect(() => {
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
      style: 'mapbox://styles/adamzhong/cklg7bgll5upk17s0ttmryydq',
      center: [lng, lat],
      minZoom: 6,
      maxZoom: 18,
      zoom: 5,
    });
    setMap(mapObj)

    onGenerateIcons();

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

  const onGenerateIcons = () => {
    //產出marker和popup的icon
    //vm.showSearch = false;
    //const iconPath = require('../../assets/img/mark.png')
    console.log(123);
    list.forEach((e, i) => {
      // create a DOM element for the marker
      var el = document.createElement('div');
      el.className = 'marker';
      el.style.backgroundImage = `url(${iconPath})`;
      if (i == 1) {
        console.log(el);
      }

      var markerHeight = 70;
      const popup = new mapboxgl.Popup({ offset: {
          'top': [0, 0],
          'bottom': [0, -markerHeight],
      }, closeButton: false });
      var popType = true? '店車資訊 ':'店家資訊 ';
      // add marker to map //vm.baseUrl + vm.mapType
      /* popup.setHTML('<div class="popup-box"><div class="popup-img" style="background-image:url(' + e.img + ')"><span class="status">'+
        e.openStatus + '</span></div><div class="popup-content"><div class="name">' + e.name + '</div><div class="cat">'+
        e.categories + '</div><div class="more"><a href="' + '/detail/' + e.id +
        '" target="_blank" rel="noopener noreferrer">' + popType + '&nbsp;<i class="fas fa-caret-right"></i></a></div><div class="distance"><i class="fas fa-map-marker-alt"></i> '+
        e.distance + '</div><div class="ongmap"><a href="https://www.google.com/maps/search/?api=1&query=' +
        e.Latitude + ',' + e.Longitude + '" target="_blank" rel="noopener noreferrer">如何前往 ?</a></div></div>'); */
      //setPopupList([...popupList, popup])
      setPopupList(prev => [...prev, popup])
      //console.log(popupList);

      const marker = new mapboxgl.Marker({element: el, anchor: 'bottom'})
        .setLngLat([e.Longitude, e.Latitude])
        .setPopup(popup) // add popups
        .addTo(map);
      //setMarkerList([...markerList, marker])
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

  const onChangeTheme = (theme = 'street') => {
    // 變更地圖主題
    const themeList = {
      street: 'mapbox://styles/adamzhong/cklg7bgll5upk17s0ttmryydq',
      satellite: 'mapbox://styles/adamzhong/cklg7g8mp5xzv17noz591r3bw'
    }
    map.setStyle(themeList[theme])
  }

  return (
    <div className="container">
      <button type="button" onClick={() => onChangeTheme('satellite')}>測試</button>
      <button type="button" onClick={() => onChangeTheme('street')}>測試</button>
      <div className="map">
        <div className="map-box" id="map"></div>
      </div>
    </div>
  );
}

export default Mapbox;