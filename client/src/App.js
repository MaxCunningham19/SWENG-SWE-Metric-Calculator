import React, {useEffect, useState} from 'react'
import './components/darkMode.css';
import Graph from './components/totalCommitsGraph'
import LinesGraph from './components/linesAddedGraph'
import DeletedGraph from './components/linesDeletedGraph'
import MergesGraph from './components/mergesGraph'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Navbar from './components/Navbar';
const data = [
  {
      "username": "declanquinn00",
      "commits": 8,
      "merges": 0
  },
  {
      "username": "Max Cunningham",
      "commits": 15,
      "lines added": 187488,
      "lines deleted": 0,
      "merges": 0
  },
  {
      "username": "francsir",
      "lines added": 58222,
      "lines deleted": -43000,
      "commits": 14,
      "merges": 0
  },
  {
      "username": "bairdr",
      "lines added": 164,
      "lines deleted": -38,
      "commits": 4,
      "merges": 0
  },
  {
      "username": "Wiktoria Fabijaniak",
      "lines added": 29382,
      "lines deleted": -65,
      "commits": 2,
      "merges": 0
  },
  {
      "username": "AAjayiB",
      "lines added": 0,
      "lines deleted": 0,
      "commits": 0,
      "merges": 0
  },
  {
      "username": "aislinggallagher",
      "lines added": 0,
      "lines deleted": 0,
      "commits": 0,
      "merges": 0
  },
  {
      "username": "okaforc",
      "lines added": 0,
      "lines deleted": 0,
      "commits": 0,
      "merges": 0
  },
  {
      "stars": 2,
      "total_commits": 45,
      "commits_to_main": 9
  },
]; 
function App() {

  const [theme, setTheme] = useState('light')
  const toggleTheme = () => {
    if (theme === 'light') {
      setTheme('dark')
    } else {
      setTheme('light')
    }
  }
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
  useEffect(() => {
    document.body.className = theme;
    }, [theme]);
  return (
    <Box>
      <Navbar data={data} toggleTheme={toggleTheme}/>
      {/* {(typeof backendData.users === 'undefined') ?  (
        <p>Loading...</p>
      ):

      (
        backendData.users.map((user, i) => (
          <p key={i}>{user}</p>
        ))
      )}
        */}
    <Box mt={10}>
    </Box>
    <Grid
  container
  direction="row"
  justifyContent="center"
  alignItems="center"
>
<Graph data={data}/> 
<LinesGraph data={data}/>
{ /* <DeletedGraph data={data}/> */}
<MergesGraph data={data}/>
</Grid>
</Box>
  )
}

export default App