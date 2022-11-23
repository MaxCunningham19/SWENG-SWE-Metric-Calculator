import React, {useEffect, useState} from 'react'
import Graph from './components/totalCommitsGraph'
import LinesGraph from './components/linesAddedGraph'
import DeletedGraph from './components/linesDeletedGraph'
import MergesGraph from './components/mergesGraph'
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
<Graph /> 
<LinesGraph />
<DeletedGraph />
<MergesGraph />
</Box>
  )
}

export default App