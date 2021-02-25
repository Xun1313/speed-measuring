import { useState, createContext } from "react";

export const MapboxContext = createContext()

const MapboxProvider = props => {
  // map object
  const [map, setMap] = useState({})
  const [theme, setTheme] = useState('street')

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

  const value = {
    theme,
    onChangeTheme,
    map,
    setMap
  }

  return (
    <MapboxContext.Provider value={value}>
      {props.children}
    </MapboxContext.Provider>
  );
}

export default MapboxProvider;