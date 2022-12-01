import React, {useEffect, useState} from 'react'

function App() {
  //const [data, setData] = useState([])
//
//
  //useEffect(() => {
  //    const getData = async () => {
  //    const newData = await fetchData();
  //    setData(newData)
  //    console.log("data", data);
  //  }
  //  getData();
  //}, [])
//
  //const fetchData = async () => {
  //  const response = await fetch("/api", {headers: {'Content-Type': 'application/json','Accept': 'application/json'}});
  //  const data = response.json
  //  return data
  //}
  const [backendData, setBackendData] = useState([{}])

  useEffect(() => {
    fetch("/api").then(
    response => response.json()
  ).then(
    data => {
      setBackendData(data)
    }
  )
  }, [])

  return(
    <div>{JSON.stringify(backendData)}</div>
  )
}

export default App