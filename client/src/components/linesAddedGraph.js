import {useEffect, useState} from 'react'
//import data from '../api/newData'
import React, { PureComponent } from 'react';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
 
function LinesAddedGraph({data}) {
    console.log(data)
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
                <YAxis dataKey="lines added"/>
                <Tooltip />
                <Legend />
                <Bar dataKey="lines added" fill="#db5a6b" />
                <Bar dataKey="lines deleted" fill="#6e5494" />
              </BarChart>
    )
  }
  
  export default LinesAddedGraph;