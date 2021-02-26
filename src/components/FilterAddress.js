import { useState } from "react";

import { city, area } from "../assets/js/city";

import Collapse from '../components/Collapse'

import Filter from './svg/Filter'
import Cross from './svg/Cross'

const FilterAddress = ({show}) => {
  // 使用者選到的縣市
  const [selectCity, setSelectCity] = useState([])
  // 使用者選到的鄉鎮市區
  const [selectArea, setSelectArea] = useState([])
  // 縣市對應鄉鎮市列表
  const [selectAreaList, setSelectAreaList] = useState([])

  const onChangeCity = value => {
    // 選擇縣市
    setSelectCity([value])
    setSelectArea([])

    const filter = area.filter(e => e.city === value)
    const result = filter.map(e => e.area)
    setSelectAreaList(result)
  }

  // 刪除選擇的縣市
  const onRemoveCity = value => {
    setSelectCity(value)

    setSelectArea([])

    setSelectAreaList([])
  }

  const onChangeArea = value => {
    // 選擇鄉鎮市區
    if (selectArea.includes(value)) return
    
    setSelectArea(prev => [...prev, value])
  }

  // 刪除選擇的鄉鎮市區
  const onRemoveArea = value => setSelectArea(prev => prev.filter(e => e !== value))

  // 重製所有選擇項目
  const onRest = () => {
    setSelectCity([])
    setSelectArea([])
    setSelectAreaList([])
  }

  // 按到的縣市和鄉鎮市區按鈕樣式
  const onBtnStyle = value => selectArea.includes(value)

  return (
    <Collapse Icon={Filter} title="條件篩選" show={show}>
      <div className="filter">

        <div className="row">
          <div className="col-12 margin-bottom-10">
            <div className="title">
              <b className="margin-top-5">縣市</b>
              {selectCity.map(item =>
                <div key={item} className="select-btn">
                  <span key={item} className="margin-right-3">{item}</span>
                  <Cross width="6" height="6" color="gray" event={{onClick: () => onRemoveCity([])}}></Cross>
                </div>
              )}
            </div>
          </div>
          {city.map(item => <div className={`col-4 text-center city-btn ${selectCity[0] === item ? 'is-select' : ''}`} key={item} onClick={() => onChangeCity(item)}>{item}</div>)}
        </div>

        <div className="row">
          <div className="col-12 margin-bottom-10">
            <div className="title">
              <b className="margin-top-5">鄉鎮市區</b>
              {selectArea.map(item =>
                <div key={item} className="select-btn">
                  <span key={item} className="margin-right-3">{item}</span>
                  <Cross width="6" height="6" color="gray" event={{onClick: () => onRemoveArea(item)}}></Cross>
                </div>
              )}
            </div>
          </div>
          {
            selectAreaList.length > 0
              ? selectAreaList.map(item => <div className={`col-4 text-center area-btn ${onBtnStyle(item) ? 'is-select' : ''}`} key={item} onClick={() => onChangeArea(item)}>{item}</div>)
              : <div className="color-gray" style={{margin: '0 auto'}}>尚未選擇縣市</div>
          }
        </div>

        <div className="filter-btn">
          <button type="button" className="btn btn-bg-light-gray btn-full no-radius color-black" onClick={onRest}>重製</button>
          <button type="button" className="btn btn-bg-blue btn-full no-radius">確認</button>
        </div>
      </div>
    </Collapse>
  );
}

export default FilterAddress;