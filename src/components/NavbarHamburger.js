import { useContext } from "react";

import { NavbarHamburgerContext } from '../contexts/NavbarHamburgerContext'
import { DarkBgContext } from '../contexts/DarkBgContext'

const NavbarHamburger = () => {
  const { showHamburgerBar, setShowHamburgerBar } = useContext(NavbarHamburgerContext)
  const { setShowDarkBg }  = useContext(DarkBgContext)

  const onToggleHamburger = () => {
    setShowHamburgerBar(false)
    setShowDarkBg(false)
  }

  return (
    <div className={`navbar-hamburger ${showHamburgerBar ? 'open' : ''}`}>
      <div className="list">{/*  onClick={onToggleHamburger} */}
        <div className="group">
          <div className="item">首頁</div>
          <div className="item">最新消息</div>
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
