import React, {useEffect, useState} from 'react'
import axios from 'axios'
import { Button } from '@mui/material'
function App() {
  const [backendData, setBackendData] = useState([{}])

  // useEffect(() => {
  //   fetch('/api', {
  //   method: 'GET',
  //   headers: {
  //       'Accept': 'application/json',
  //   },
  //   }).then(
  //   response => response.json()
  // ).then(
  //   data => {
  //     setBackendData(data)
  //   }
  // )
  // }, [])

  const data={repo_name:"MaxCunningham19/SWENG-SWE-Metric-Calculator",api_key:"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"}
  const getRepo = async ()=>{
    const {datan} = await axios.post('http://localhost:5000/api',data)
    return datan

  }
  useEffect(()=>{
        getRepo()
    },[]);
  return(
    // <div>{JSON.stringify(backendData)}</div>
    <Button onClick={()=>getRepo()}>Submit</Button>
    
  )
}

export default App