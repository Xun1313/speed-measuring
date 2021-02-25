import { useState, useEffect } from "react";
import Magnifier from './svg/Magnifier'
import Clock from './svg/Clock'
import Arrow from './svg/Arrow'

const SearchPanel = () => {
  const [close, setClose] = useState(false)

  return (
    <div className="search-container">
      <div className={`search-panel ${close ? 'close' : ''}`}>
        <div className="box-bg">
          <div className="search-group">
            <input type="text" style={{width: '85%'}}/>
            <Magnifier width="20" height="20" color="gray"></Magnifier>
          </div>

          <div className="record-item">{/*  onClick={} */}
            <Clock width="20" height="20" color="gray"></Clock>
            <div className="margin-left-15">123</div>{/*  style={{maxWidth: 205}} */}
          </div>
        </div>

        <div className="collapse1">
          <Arrow width="10" height="10" color="blue" direction="up"></Arrow>
          <span className="margin-left-10">隱藏全部</span>
        </div>
      </div>

      <div className="collapse2" onClick={() => setClose(prev => !prev)}>{/* 手機板直接顯示上一頁箭頭 */}
        <Arrow width="10" height="10" color="gray" direction={close ? 'right' : 'left'}></Arrow>
      </div>
    </div>
  );
}

export default SearchPanel;