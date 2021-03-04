import { useState, createContext } from "react";

export const RecordContext = createContext()

const RecordProvider = props => {
  const [record, setRecord] = useState([])

  const onGetRecord = () => {
    if (localStorage.getItem('record')) {
      const result = JSON.parse(localStorage.getItem('record'))
      setRecord(result)
    }
  }

  const onSetRecord = value => {
    setRecord(prev => {
      if (prev.includes(value)) {
        return prev
      } else {
        localStorage.setItem('record', JSON.stringify([value, ...prev]))
        return [value, ...prev]
      }
    })
  }

  const onRemoveRecord = value => {
    setRecord(prev => {
      const result = prev.filter(e => e !== value)
      localStorage.setItem('record', JSON.stringify(result))
      return result
    })
  }

  const value = {
    record,
    setRecord,
    onGetRecord,
    onSetRecord,
    onRemoveRecord,
  }

  return (
    <RecordContext.Provider value={value}>
      {props.children}
    </RecordContext.Provider>
  );
}

export default RecordProvider;