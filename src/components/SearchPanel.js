import { useState, useEffect, useContext } from "react";

import Magnifier from './svg/Magnifier'
import Arrow from './svg/Arrow'
import HamburgerMenu from './svg/HamburgerMenu'
import Cross from './svg/Cross'
import Camera from './svg/Camera'
import Loading from './svg/Loading'
import Direction from './svg/Direction'

import { GeneralContext } from '../contexts/GeneralContext'
import { MapboxContext } from '../contexts/MapboxContext'
import { RecordContext } from '../contexts/RecordContext'

import FilterAddress from './FilterAddress'
import FilterAddressResult from './FilterAddressResult'
import RecordList from './RecordList'

const SearchPanel = () => {
  const [collapse1, setCollapse1] = useState(false)
  const [collapse2, setCollapse2] = useState(false)
  const [keyword, setKeyword] = useState('')
  
  const { onToggleHamburger, feature, setFeature, searchStatus, setSearchStatus, isMobile } = useContext(GeneralContext)
  
  const { userList } = useContext(MapboxContext)

  const { onSetRecord } = useContext(RecordContext)

  useEffect(() => {
    // todo: 判斷手機沒辦法那麼及時改值在useState, 目前只想到用監聽的方式
    setCollapse1(isMobile ? true : false)
  }, [isMobile])

  const onSearch = value => {
    // 搜尋過去的搜尋紀錄
    if (value) onSetRecord(value)
  }

  const onBack = () => {
    // 回到狀態列
    setFeature('filterAddress')
    setSearchStatus('camera')
  }

  return (
    <div className={`search-container ${collapse2 ? 'collapse2-close' : ''}`}>
      <div className={`search-panel ${collapse1 ? 'collapse1-close' : ''}`}>
        <div className="box-bg">
          <div className="search-style">
            <div className={`search-group ${collapse1 ? 'collapse1-close' : ''}`}>
              {
                // 漢堡選單和上一層的 icon 
                isMobile && !collapse1
                ? <Direction width="20" height="20" color="gray" pointer={true} event={{onClick: () => setCollapse1(true)}}></Direction>
                : <HamburgerMenu width="15" height="15" color="gray" pointer={true} event={{onClick: () => onToggleHamburger(true)}}></HamburgerMenu>
              }
              <input type="text" className="font-size-14 margin-left-10 margin-right-10" placeholder="搜尋測速相機地址" onKeyUp={e => e.keyCode === 13 ? onSearch(e.target.value) : ''} onChange={e => setKeyword(e.target.value)} onFocus={() => isMobile ? setCollapse1(false) : ''} style={{width: '85%'}}/>

              <Magnifier width="15" height="15" color="gray" pointer={true} event={{onClick: () => onSearch(keyword)}}></Magnifier>
              <div className="margin-left-8 margin-right-8" style={{borderLeft: '1px solid rgba(0,0,0,0.2)', borderTop: '20px solid rgba(0,0,0,0.2)'}}></div>

              {/* 搜尋右側的三種狀態改變 */}
              {searchStatus === 'camera' && <Camera width="18" height="18"></Camera>}
              {searchStatus === 'loading' && <Loading width="15" height="15" customClass="loading"></Loading>}
              {searchStatus === 'cross' && <Cross width="15" height="15" color="gray" pointer={true} event={{onClick: onBack}}></Cross>}
            </div>
            
            {
              // 顯示搜尋紀錄
              !collapse1
              && feature === 'filterAddress'
              && <RecordList></RecordList>
            }

            {
              // 顯示篩選地址筆數
              !collapse1
              && feature === 'filterAddressResult'
              && <div className="filterAddressResult-item font-size-14 color-light-black">查詢到{userList.length}筆相關資料</div>
            }
          </div>
        </div>

        {
          // 條件篩選
          !collapse1
          && feature === 'filterAddress'
          && <FilterAddress></FilterAddress>
        }
        {
          // 條件篩選結果
          !collapse1
          && feature === 'filterAddressResult'
          && <FilterAddressResult setCollapse1={setCollapse1}></FilterAddressResult>
        }

        {
          // 電腦版上下收合
          !isMobile && <div className={`collapse1 ${collapse1 ? 'collapse1-close' : ''}`} onClick={() => setCollapse1(prev => !prev)}>
            <Arrow width="10" height="10" color="blue" direction="top" pointer={true}></Arrow>
            <span className="margin-left-10">{`${collapse1 ? '查看全部' : '隱藏全部'}`}</span>
          </div>
        }
        
      </div>

      {
        // 電腦版左右收合
        !isMobile && !collapse1 && <div className="collapse2" onClick={() => setCollapse2(prev => !prev)}>
          <Arrow width="10" height="10" color="gray" pointer={true} direction={collapse2 ? 'right' : 'left'}></Arrow>
        </div>
      }
    </div>
  );
}

export default SearchPanel;