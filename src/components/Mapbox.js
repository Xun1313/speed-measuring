import { useState, useEffect, useContext } from "react";
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import iconPath from '../assets/img/mark.png'

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
    data.result.records.forEach(function(test) {
      // create a DOM element for the marker
      var el = document.createElement('div');
      el.className = 'marker';
      el.style.backgroundImage = `url(${iconPath})`;

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
      setPopupList(prev => [...prev, popup])

      const marker = new mapboxgl.Marker({element: el, anchor: 'bottom'})
        .setLngLat([test.Longitude, test.Latitude])
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