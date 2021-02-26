import { useState, useContext } from "react";

import Magnifier from './svg/Magnifier'
import Clock from './svg/Clock'
import Arrow from './svg/Arrow'
import HamburgerMenu from './svg/HamburgerMenu'
import Cross from './svg/Cross'

import { GeneralContext } from '../contexts/GeneralContext'

import FilterAddress from './FilterAddress'

const SearchPanel = () => {
  const [collapse1, setCollapse1] = useState(false)
  const [collapse2, setCollapse2] = useState(false)

  const { onToggleHamburger } = useContext(GeneralContext)

  const onRemoveRecord = e => {
    // 刪除瀏覽紀錄
    e.stopPropagation()
    console.log('onRemoveRecord');
  }

  const onSearch = () => {
    // 搜尋
    //const result = list.filter(e => )
    console.log('onSearch');
  }

  return (
    <div className="search-container">
      <div className={`search-panel ${collapse1 ? 'collapse1-close' : ''} ${collapse2 ? 'collapse2-close' : ''}`}>
        <div className="box-bg">
          <div className="search-style">
            <div className={`search-group ${collapse1 ? 'collapse1-close' : ''}`}>
              <HamburgerMenu width="15" height="15" color="gray" event={{onClick: () => onToggleHamburger(true)}}></HamburgerMenu>
              <input type="text" className="font-size-14 margin-left-10 margin-right-10" placeholder="搜尋測速相機地址" style={{width: '85%'}}/>
              <Magnifier width="15" height="15" color="gray"></Magnifier>
            </div>

            {!collapse1 && <div className="record-item" onClick={() => onSearch()}>
              <Clock width="15" height="15" color="gray"></Clock>
              <div className="margin-left-15 font-size-13" style={{marginRight: 'auto'}}>123</div>
              <Cross width="0" height="0" color="gray" customClass="cross" event={{ onClick: e => onRemoveRecord(e)}}></Cross>
            </div>}
          </div>
        </div>

        <FilterAddress show={collapse1}></FilterAddress>

        <div className={`collapse1 ${collapse1 ? 'collapse1-close' : ''}`} onClick={() => setCollapse1(prev => !prev)}>
          <Arrow width="10" height="10" color="blue" direction="top"></Arrow>
          <span className="margin-left-10">{`${collapse1 ? '查看全部' : '隱藏全部'}`}</span>
        </div>
      </div>

      {!collapse1 && <div className="collapse2" onClick={() => setCollapse2(prev => !prev)}>{/* 手機板直接顯示上一頁箭頭 */}
        <Arrow width="10" height="10" color="gray" direction={collapse2 ? 'right' : 'left'}></Arrow>
      </div>}
    </div>
  );
}

export default SearchPanel;