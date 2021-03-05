import { useState, useEffect, useContext } from "react";
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'

import { MapboxContext } from '../contexts/MapboxContext'
// eslint-disable-next-line import/no-webpack-loader-syntax
mapboxgl.workerClass = require('worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker').default;

const Mapbox = () => {
  // loading 開關
  const [loading, setLoading] = useState(true)

  const { list, map, setMap, onGenerateIcons } = useContext(MapboxContext)

  useEffect(() => {
    //onGetApi()

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

    onGenerateIcons(mapObj, list);

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

  const moveend = () => {
    //this.showSearch = true;
  }

  return (
    <div className="map">
      <div className="map-box" id="map"></div>
    </div>
  );
}

export default Mapbox;