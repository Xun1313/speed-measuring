import { useContext } from "react";

import { GeneralContext } from '../contexts/GeneralContext'
import { MapboxContext } from '../contexts/MapboxContext'

import Street from './svg/Street'
import Satellite from './svg/Satellite'
import Dark from './svg/Dark'

const NavbarHamburger = () => {
  const { showHamburgerBar, onToggleHamburger } = useContext(GeneralContext)
  const { theme, onChangeTheme } = useContext(MapboxContext)


  return (
    <div className={`navbar-hamburger ${showHamburgerBar ? 'open' : ''}`}>
      <div className="list" onClick={() => onToggleHamburger(false)}>
        <div className="group">
          <div className={`item ${theme === 'street' ? 'is-select' : ''}`} onClick={() => onChangeTheme('street')}>
            <Street width="20" height="20"></Street>
            <span className="margin-left-15">街道</span>
          </div>
          <div className={`item ${theme === 'satellite' ? 'is-select' : ''}`} onClick={() => onChangeTheme('satellite')}>
            <Satellite width="20" height="20"></Satellite>
            <span className="margin-left-15">衛星</span>
          </div>
          <div className={`item ${theme === 'dark' ? 'is-select' : ''}`} onClick={() => onChangeTheme('dark')}>
            <Dark width="20" height="20"></Dark>
            <span className="margin-left-15">夜間模式</span>
          </div>
        </div>

        <div className="group">
          <div className="item">首頁</div>
          <div className="item">最新消息</div>
        </div>

        <div className="group">
          <div className="item">首頁</div>
          <div className="item">最新消息</div>
        </div>
      </div>
    </div>
  );
}

export default NavbarHamburger;
