import { useState } from "react";
import Arrow from './svg/Arrow'

const Collapse = ({ Icon, title, show, children }) => {
  const [showCollapse, setShowCollapse] = useState(true)

  return (
    <div className="box-bg collapse" style={{display: show ? 'none' : ''}}>
      <div className="collapse-title" onClick={() => setShowCollapse(prev => !prev)}>
        <Icon width="15" height="15" color="gray"></Icon>
        <span className="margin-left-10" style={{ marginRight: 'auto' }}>{title}</span>
        <Arrow width="10" height="10" direction={`${showCollapse ? 'bottom' : 'right'}`}></Arrow>
      </div>

      <div className={`collapse-content ${showCollapse ? 'open' : ''}`}>
        {children}
      </div>
    </div>
  );
}

export default Collapse;