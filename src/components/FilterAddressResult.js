import { useContext } from "react";

import Go from './svg/Go'

import { GeneralContext } from '../contexts/GeneralContext'
import { MapboxContext } from '../contexts/MapboxContext'

const FilterAddressResult = ({setCollapse1}) => {
  const { isMobile } = useContext(GeneralContext)
  const { userList, onFlyto } = useContext(MapboxContext)

  const onMove = (Longitude, Latitude) => {
    // 只有手機板要前往時折疊
    setCollapse1(isMobile ? true : false)
    onFlyto(Longitude, Latitude)
  }

  return (
    <div className="filter-address-result box-bg">
      {
        userList.length > 0
          ? userList.map((item, index) => (
            <div className="item" key={index}>
              <div>
                <b className="font-size-20 margin-bottom-5">速限: <span className="color-red">{item.limit}</span></b>
                <div className="font-size-15 margin-bottom-5">設置縣市: {item.CityName}</div>
                <div className="font-size-14 margin-bottom-5">設置市區鄉鎮: {item.RegionName}</div>
                <div className="font-size-14 margin-bottom-5">設置地址: {item.Address}</div>
                <div className="font-size-14 margin-bottom-5">管轄警局: {item.DeptNm}</div>
                <div className="font-size-14 margin-bottom-5">管轄分局: {item.BranchNm}</div>
                <div className="font-size-14 margin-bottom-5">拍攝方向: {item.direct}</div>
              </div>
  
              <div className="icon" onClick={() => onMove(item.Longitude, item.Latitude)}>
                <Go width="35" height="35" customClass="svg" pointer={true}></Go>
                <br/>
                <div className="text-center">
                  <b className="font-size-14 margin-top-5">前往</b>
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