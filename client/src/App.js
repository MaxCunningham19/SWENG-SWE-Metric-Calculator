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
import Pie from './components/PieChart'
import Navbar from './components/Navbar';
import { Typography } from '@mui/material';
import Image from './api/contributors.png'
const data = [
  {
    "stars": 3,
    "total_commits_to_main": 61,
    "total_branches": 7,
    "contributors": [
      "AAjayiB",
      "okaforc",
      "VictoriaFabijaniak",
      "bairdr",
      "MaxCunningham19",
      "aislinggallagher",
      "declanquinn00",
      "francsir"
    ]
  }
];
const contributor_data = [
  {
    "user": "AAjayiB",
    "total_additions": 242,
    "total_deletions": -68,
    "total_commits": 5,
    "average_commitsPerWeek": 0,
    "very_many_lines_of_code": 0,
    "very_many_lines_of_code_commits": 0,
    "many_lines_of_code": 0,
    "many_lines_of_code_commits": 0,
    "average_lines_of_code": 226,
    "average_lines_of_code_commits": 3,
    "few_lines_of_code": 16,
    "few_lines_of_code_commits": 2
  },
  {
    "user": "okaforc",
    "total_additions": 218,
    "total_deletions": -65,
    "total_commits": 3,
    "average_commitsPerWeek": 0,
    "very_many_lines_of_code": 0,
    "very_many_lines_of_code_commits": 0,
    "many_lines_of_code": 0,
    "many_lines_of_code_commits": 0,
    "average_lines_of_code": 218,
    "average_lines_of_code_commits": 3,
    "few_lines_of_code": 0,
    "few_lines_of_code_commits": 0
  },
  {
    "user": "VictoriaFabijaniak",
    "total_additions": 2733,
    "total_deletions": -137,
    "total_commits": 4,
    "average_commitsPerWeek": 0,
    "very_many_lines_of_code": 2535,
    "very_many_lines_of_code_commits": 1,
    "many_lines_of_code": 0,
    "many_lines_of_code_commits": 0,
    "average_lines_of_code": 182,
    "average_lines_of_code_commits": 2,
    "few_lines_of_code": 16,
    "few_lines_of_code_commits": 1
  },
  {
    "user": "bairdr",
    "total_additions": 131,
    "total_deletions": -48,
    "total_commits": 4,
    "average_commitsPerWeek": 0,
    "very_many_lines_of_code": 0,
    "very_many_lines_of_code_commits": 0,
    "many_lines_of_code": 0,
    "many_lines_of_code_commits": 0,
    "average_lines_of_code": 128,
    "average_lines_of_code_commits": 3,
    "few_lines_of_code": 3,
    "few_lines_of_code_commits": 1
  },
  {
    "user": "MaxCunningham19",
    "total_additions": 120829,
    "total_deletions": -36,
    "total_commits": 8,
    "average_commitsPerWeek": 0,
    "very_many_lines_of_code": 120704,
    "very_many_lines_of_code_commits": 2,
    "many_lines_of_code": 0,
    "many_lines_of_code_commits": 0,
    "average_lines_of_code": 102,
    "average_lines_of_code_commits": 3,
    "few_lines_of_code": 23,
    "few_lines_of_code_commits": 3
  },
  {
    "user": "aislinggallagher",
    "total_additions": 60960,
    "total_deletions": -37768,
    "total_commits": 6,
    "average_commitsPerWeek": 0,
    "very_many_lines_of_code": 60951,
    "very_many_lines_of_code_commits": 4,
    "many_lines_of_code": 0,
    "many_lines_of_code_commits": 0,
    "average_lines_of_code": 0,
    "average_lines_of_code_commits": 0,
    "few_lines_of_code": 9,
    "few_lines_of_code_commits": 2
  },
  {
    "user": "declanquinn00",
    "total_additions": 878,
    "total_deletions": -430,
    "total_commits": 12,
    "average_commitsPerWeek": 0,
    "very_many_lines_of_code": 0,
    "very_many_lines_of_code_commits": 0,
    "many_lines_of_code": 241,
    "many_lines_of_code_commits": 1,
    "average_lines_of_code": 631,
    "average_lines_of_code_commits": 8,
    "few_lines_of_code": 6,
    "few_lines_of_code_commits": 3
  },
  {
    "user": "francsir",
    "total_additions": 88178,
    "total_deletions": -20542,
    "total_commits": 19,
    "average_commitsPerWeek": 2.6666666666666665,
    "very_many_lines_of_code": 87029,
    "very_many_lines_of_code_commits": 3,
    "many_lines_of_code": 606,
    "many_lines_of_code_commits": 2,
    "average_lines_of_code": 524,
    "average_lines_of_code_commits": 7,
    "few_lines_of_code": 19,
    "few_lines_of_code_commits": 7
  }
];


function App() {

  const [theme, setTheme] = useState('light')
  async function getData() {
    const requestOptions = {
      crossDomain:true,
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': 'true'
    },
      body: JSON.stringify({ name:'MaxCunningham19/SWENG-SWE-Metric-Calculator',api: '' })
    };
    const response = await fetch('/api', requestOptions);
    const data = await response.json();
    console.log(data)
    this.setState({ postId: data.id });
  }
  // empty dependency array means this effect will only run once (like componentDidMount in classes)
  const toggleTheme = () => {
    getData()
    if (theme === 'light') {
      console.log('dark')
      getData()
      setTheme('dark')
    } else {
      console.log('light')
      setTheme('light')
    }
  }
  {/*const [backendData, setBackendData] = useState([{}])

  useEffect(() => {
    fetch("/api", {
      mode: 'cors',
    }).then(
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

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));
  console.log(data[0].total_commits_to_main)
  return (
    <>

      <Box sx={{ width: 1 }}>
        <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gap={2}>
          <Box gridColumn="span 12" mb={10}>
            <Navbar data={contributor_data} toggleTheme={toggleTheme} />
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
              <Typography variant="h5" align="center">{data[0].total_commits_to_main}</Typography>
            </Box>
          </Box>
          <Box gridColumn="span 4">
            <Box sx={{ border: 5, borderColor: 'grey.500' }}>
              <Typography variant="h5" align="center">Number of Branches:</Typography>
              <Typography variant="h5" align="center">{data[0].total_branches}</Typography></Box>
          </Box>
          <Box gridColumn="span 4">
            <Box sx={{ border: 5, borderColor: 'grey.500' }}>
              <Typography variant="h5" align="center">Number of Contributors:</Typography>
              <Typography variant="h5" align="center">{data[0].contributors.length}</Typography></Box>
          </Box>
          <Box gridColumn="span 6">
            <Graph data={contributor_data} />
          </Box>
          <Box gridColumn="span 6">
            <LinesGraph data={contributor_data} />
          </Box>
          <Box gridColumn="span 6">
            <MergesGraph data={contributor_data} />
          </Box>

        </Box>
      </Box>
    </>

  )
}

export default App