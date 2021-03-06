import { useEffect, useContext } from "react";

import Clock from './svg/Clock'
import Cross from './svg/Cross'

import { GeneralContext } from '../contexts/GeneralContext'
import { RecordContext } from '../contexts/RecordContext'

const RecordList = ({onSearch}) => {
  const { isMobile } = useContext(GeneralContext)
  const { record, onGetRecord, onRemoveRecord } = useContext(RecordContext)

  useEffect(() => {
    // 抓出歷史紀錄
    onGetRecord()
  }, []);

  const onRemove = (e, value) => {
    // 刪除瀏覽紀錄
    e.stopPropagation()

    onRemoveRecord(value)
  }
  
  return (record.length === 0
    ? <div className="color-gray box-bg text-center">無搜尋紀錄</div>
    : record.map(item =>
      <div className="record-item" key={item} onClick={() => onSearch(item)}>
        <Clock width="15" height="15" color="gray" pointer={true}></Clock>
        <div className="margin-left-15 font-size-13" style={{marginRight: 'auto'}}>{item}</div>
        <Cross width={isMobile ? 8 : 0} height={isMobile ? 8 : 0} color="gray" customClass="cross" pointer={true} event={{ onClick: e => onRemove(e, item)}}></Cross>
      </div>));
}

export default RecordList;