import React, { useEffect, useState } from 'react'
import './components/darkMode.css';
import Graph from './components/totalCommitsGraph'
import LinesGraph from './components/linesAddedGraph'
import DeletedGraph from './components/linesDeletedGraph'
import MergesGraph from './components/AvgLinesGraph'
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Navbar from './components/Navbar';
import { Typography } from '@mui/material';
import Image from './api/contributors.png'


function App() {


  const [theme, setTheme] = useState('light')
  const toggleTheme = () => {
    if (theme === 'light') {
      setTheme('dark')
    } else {
      setTheme('light')
    }
  }

  const [data, setBackendData] = useState([])

  useEffect(() => {
    fetch("/api").then(
      response => response.json()
    ).then(
      d => {
        setBackendData(d)
      }
    )
  }, [])

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));
  console.log(data.contributor_data)
  return (
    <>
      {(typeof data.contributor_data == 'undefined') ? (
        <p>Loading...</p>
      ) :
        (
          <Box sx={{ width: 1 }}>
            <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gap={2}>
              <Box gridColumn="span 12" mb={10}>
                <Navbar data={data.contributor_data} toggleTheme={toggleTheme} />
              </Box>
              <Box gridColumn="span 12">
                <a href="https://github.com/MaxCunningham19/SWENG-SWE-Metric-Calculator">
                  <Box align="center"><img src={Image} alt="horse" /></Box>
                </a>
              </Box>
              <Box gridColumn="span 12">
                <Box><Typography variant="h2" align="center">Welcome to the Github Repository Metric Dashboard</Typography></Box>
              </Box>
              <Box gridColumn="span 4">
                <Box sx={{ border: 5, borderColor: 'grey.500' }}>
                  <Typography variant="h5" align="center">Commits to Main:</Typography>
                  <Typography variant="h5" align="center">{data.total_commits_to_main}</Typography>
                </Box>
              </Box>
              <Box gridColumn="span 4">
                <Box sx={{ border: 5, borderColor: 'grey.500' }}>
                  <Typography variant="h5" align="center">Number of Branches:</Typography>
                  <Typography variant="h5" align="center">{data.total_branches}</Typography></Box>
              </Box>
              <Box gridColumn="span 4">
                <Box sx={{ border: 5, borderColor: 'grey.500' }}>
                  <Typography variant="h5" align="center">Number of Contributors:</Typography>
                  <Typography variant="h5" align="center">{data.contributors.length}</Typography></Box>
              </Box>
              <Box gridColumn="span 6">
                <Graph data={data.contributor_data} />
              </Box>
              <Box gridColumn="span 6">
                <LinesGraph data={data.contributor_data} />
              </Box>
              <Box gridColumn="span 6">
                <MergesGraph data={data.contributor_data} />
              </Box>

            </Box>
          </Box>
        )}
    </>

  )
}

export default App