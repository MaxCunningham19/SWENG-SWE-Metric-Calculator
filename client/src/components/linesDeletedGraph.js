import {useEffect, useState} from 'react'
//import data from '../api/newData'
import React, { PureComponent } from 'react';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

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
        "lines deleted": 43,
        "commits": 14,
        "merges": 0
    },
    {
        "username": "bairdr",
        "lines added": 164,
        "lines deleted": 38,
        "commits": 4,
        "merges": 0
    },
    {
        "username": "Wiktoria Fabijaniak",
        "lines added": 29382,
        "lines deleted": 65,
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
function LinesDeletedGraph() {
    //const [graphData, setGraphData] = useState();
    //const [loading, setLoading] = useState(true);
    //setGraphData(data);
    //setLoading(false);
    return (
              <BarChart
                width={2000}
                height={800}
                data={data}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="username" />
                <YAxis dataKey="lines deleted"/>
                <Tooltip />
                <Legend />
                <Bar dataKey="lines deleted" fill="#db5a6b" />
              </BarChart>
    )
  }
  
  export default LinesDeletedGraph;