import { useState, useContext } from "react";

import Go from './svg/Go'

import { MapboxContext } from '../contexts/MapboxContext'

const FilterAddressResult = () => {
  const { userList, onFlyto } = useContext(MapboxContext)
  const [test] = useState([{"CityName":"雲林縣","RegionName":"莿桐鄉","Address":"台1線公路235k+592m處","DeptNm":"雲林縣警察局","BranchNm":"斗六分局","Longitude":"120.494446","Latitude":"23.742592","direct":"南北雙向","limit":"60"},{"CityName":"雲林縣","RegionName":"莿桐鄉","Address":"台1線公路與中正路口","DeptNm":"雲林縣警察局","BranchNm":"斗六分局","Longitude":"120.49677","Latitude":"23.75775","direct":"北向南","limit":"70"},{"CityName":"雲林縣","RegionName":"莿桐鄉","Address":"156縣道與莿桐外環道(孩沙里)路口","DeptNm":"雲林縣警察局","BranchNm":"斗六分局","Longitude":"120.506424","Latitude":"23.766708","direct":"北向南","limit":"60"},{"CityName":"雲林縣","RegionName":"莿桐鄉","Address":"台1丁線公路與農校路口","DeptNm":"雲林縣警察局","BranchNm":"斗六分局","Longitude":"120.508675","Latitude":"23.750402","direct":"北向南","limit":"60"}])

  return (
    <div className="filter-address-result box-bg">
      {
        userList.length > 0
          ? userList.map((item, index) => (
            <div className="item" key={index}>
              <div>
                <b className="font-size-15">{item.CityName}</b>
                <div className="font-size-13">{item.RegionName}</div>
                <div className="font-size-13">{item.Address}</div>
                <div className="font-size-13">{item.DeptNm}</div>
                <div className="font-size-13">{item.BranchNm}</div>
                <div className="font-size-13">{item.direct}</div>
                <div className="font-size-13">{item.limit}</div>
              </div>
  
              <div className="icon" onClick={() => onFlyto(item.Longitude, item.Latitude)}>
                <Go width="35" height="35" customClass="svg"></Go>
                <br/>
                <div className="text-center">
                  <b className="font-size-13 margin-top-5">前往</b>
                </div>
              </div>
            </div>
          ))
          : <div className="text-center color-gray">查無相關資料</div>
      }
    </div>
  );
}

export default FilterAddressResult;