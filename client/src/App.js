import React, { useEffect, useState } from 'react'
import './components/darkMode.css';
import Graph from './components/totalCommitsGraph'
import LinesGraph from './components/linesAddedGraph'
import DeletedGraph from './components/linesDeletedGraph'
import MergesGraph from './components/AvgLinesGraph'
import DialogBox from './components/DialogBox'
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Pie from './components/PieChart'
import Navbar from './components/Navbar';
import { Typography } from '@mui/material';
import Image from './api/contributors.png'

function App() {

  const [theme, setTheme] = useState('light')
  const [data, setBackendData] = useState([])
  const [token, setToken] = useState('');
  const [repo, setRepo] = useState('');
  const [isVerified, setVerified] = useState(false);



  async function retrieveData(name, api) {
    const requestOptions = {
      crossDomain:true,
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': 'true'
    },
      body: JSON.stringify({ name: name,api: api })
    };
    const response = await fetch('/api', requestOptions);
    if (response.status === 200){
      const d = await response.json();
      console.log(d);
      setBackendData(d);
      this.setState({ postId: data.id });
    }
  }
  // empty dependency array means this effect will only run once (like componentDidMount in classes)
  const toggleTheme = () => {
    if (theme === 'light') {
      console.log('dark')
      setTheme('dark')
    } else {
      console.log('light')
      setTheme('light')
    }
  }

  // useEffect(() => {
  //   getData();
  // }, []);

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

  if(isVerified)
  {
    retrieveData(repo,token)
  return (
    <>
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
          </>
        )
        }
  return (
    <DialogBox repo={repo} setRepo = {setRepo} token={token} setToken={setToken} isVerified={isVerified} 
    setVerified={setVerified}/>
  )
          }

export default App;