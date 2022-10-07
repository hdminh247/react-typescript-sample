import React, {useEffect, useState} from 'react';
import axios from "axios";

import "./index.scss"

function App() {
  const [selectedRow, setSelectedRow] = useState(0);
  const [data, setData] = useState([])

  const onChange = (index: number, key: string, value: string) => {
    const currentData: any = [...data]
    currentData[index][key] = value

    setData(currentData)
  }

  const onFetch = async () => {
    const { data } = await axios.get("http://localhost:5500/api/v1/translations")

    setData(data)
  }

  const onSave = (index: number) => {
    // Call API here
    console.log(data[index])
    axios.put("http://localhost:5500/api/v1/translations", { index, data: data[index] })

  }

  useEffect(()=>{
    onFetch();
  },[])


  return <div className={"container"}>
    {data.map(({english, danish}, index)=>{
      return <div className={`row ${selectedRow === index ? "active" : ""}`} onClick={()=>{setSelectedRow(index)}} key={index}>
        <div className={"col"}>
          <label>English</label>
          <textarea placeholder={"Input the text"} value={english} onChange={(e)=>{onChange(index, "english", e.target.value)}}/>
        </div>
        <div className={"col"}>
          <label>Danish</label>
          <textarea placeholder={"Input the text"} value={danish} onChange={(e)=>{onChange(index, "danish", e.target.value)}}/>
        </div>
        {selectedRow === index && <button onClick={()=>{onSave(index)}}>Save</button>}
      </div>
    })}
  </div>
}

export default App;
