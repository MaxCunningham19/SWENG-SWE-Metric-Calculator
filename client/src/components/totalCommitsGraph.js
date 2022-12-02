import {useEffect, useState} from 'react'
//import data from '../api/newData'
import React, { PureComponent } from 'react';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

function TotalCommitsGraph({data}) {
    //const [graphData, setGraphData] = useState();
    //const [loading, setLoading] = useState(true);
    //setGraphData(data);
    //setLoading(false);
    return (
      <ResponsiveContainer width="100%" height={400}>
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
        <XAxis dataKey="user" />
        <YAxis dataKey="total_commits"/>
        <Tooltip />
        <Legend />
        <Bar dataKey="total_commits" fill="#5C83CA" />
      </BarChart>
      </ResponsiveContainer>
    )
  }
  
  export default TotalCommitsGraph;