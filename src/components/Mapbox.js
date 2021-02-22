import { useState, useEffect } from "react";

const Mapbox = () => {
  // 資料列表
  const [list, setList] = useState([])

  const [loading, setLoading] = useState(true)
  // 緯度
  const [lat, setLat] = useState('')
  // 經度
  const [lng, setLng] = useState('')
  // 儲存畫面上當下所有marker object
  const [marker, setMarker] = useState([])
  // 儲存畫面上當下所有popup object
  const [popup, setPopup] = useState([])
  // map object
  const [map, setMap] = useState({})

  useEffect(() => {
    /* navigator.geolocation.getCurrentPosition(position => {
      // 使用者同意
      vm.onMap(position.coords.longitude, position.coords.latitude);
    }, err => {
      // 使用者按封鎖
      vm.onMap(120.3232675, 22.6294885);
    }); */
  }, []);

  const onMap = async (longitude, latitude) => {
    setLng(Number(longitude));
    setLat(Number(latitude));

    onInitMap(lng, lat, 14);

    onGenerateIcons();

    setLoading(false);
  }

  const onInitMap = (lng, lat, zoom) => {
    mapboxgl.accessToken = 'pk.eyJ1IjoiYWRhbXpob25nIiwiYSI6ImNrbGc3NTNmejUxbmgycHBsZzBsYnZ5MWYifQ.Z7ylxFjrj0dVnHlvrha8oA';
    const mapObj = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/adamzhong/cklg7bgll5upk17s0ttmryydq',
      center: [lng, lat],
      minZoom: 6,
      maxZoom: 18,
      zoom: zoom,
    });
    setMap(mapObj)

    //顯示右上角的+- zoomin zoomout功能
    map.addControl(new mapboxgl.NavigationControl());
    //顯示左下角的高空距離
    map.addControl(new mapboxgl.ScaleControl({
      maxWidth: 70
    }));
    //顯示右上角的全螢幕觀看
    map.addControl(new mapboxgl.FullscreenControl({
      container: 'map'
    }));

    map.on('moveend', moveend);
  }

  const onGenerateIcons = () => {
    //產出marker和popup的icon
    var vm = this;
    vm.showSearch = false;
    vm.items.forEach(function(e) {
      // create a DOM element for the marker
      var el = document.createElement('div');
      el.className = 'marker';

      if(vm.mapType === 'diningCar') {
        el.style.backgroundImage = 'url(' + require('~/assets/img/icon/mapicon_off.png') + ')';
      }

      var markerHeight = 70;
      const popup = new mapboxgl.Popup({ offset: {
          'top': [0, 0],
          'bottom': [0, -markerHeight],
      }, closeButton: false });
      var popType = (vm.mapType === 'diningCar')? '店車資訊 ':'店家資訊 ';
      // add marker to map
      popup.setHTML('<div class="popup-box"><div class="popup-img" style="background-image:url(' + e.img + ')"><span class="status">'+
         e.openStatus + '</span></div><div class="popup-content"><div class="name">' + e.name + '</div><div class="cat">'+
         e.categories + '</div><div class="more"><a href="' + vm.baseUrl + vm.mapType +'/detail/' + e.id +
         '" target="_blank" rel="noopener noreferrer">' + popType + '&nbsp;<i class="fas fa-caret-right"></i></a></div><div class="distance"><i class="fas fa-map-marker-alt"></i> '+
         e.distance + '</div><div class="ongmap"><a href="https://www.google.com/maps/search/?api=1&query=' +
         e.latitude + ',' + e.longitude + '" target="_blank" rel="noopener noreferrer">如何前往 ?</a></div></div>');
      vm.popup.push(popup)

      const marker = new mapboxgl.Marker({element: el, anchor: 'bottom'})
          .setLngLat([e.longitude, e.latitude])
          .setPopup(popup) // add popups
          .addTo(vm.map);
      vm.marker.push(marker)
    });
  }

  const moveend = () => {
    this.showSearch = true;
  }

  return (
    <div class="map-box" id="map"></div>
  );
}

export default Mapbox;