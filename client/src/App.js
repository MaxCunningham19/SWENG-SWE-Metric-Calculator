import React, {useEffect, useState} from 'react'
import Graph from './components/totalCommitsGraph'
import Box from '@mui/material/Box';

function App() {

  {/*const [backendData, setBackendData] = useState([{}])

  useEffect(() => {
    fetch("/api").then(
      response => response.json()
    ).then(
      data => {
        setBackendData(data)
      }
    )
  }, []) */}
  return (
    <Box>
      {/* {(typeof backendData.users === 'undefined') ?  (
        <p>Loading...</p>
      ):

      (
        backendData.users.map((user, i) => (
          <p key={i}>{user}</p>
        ))
      )}
        */}
<Graph /> </Box>
  )
}

export default App