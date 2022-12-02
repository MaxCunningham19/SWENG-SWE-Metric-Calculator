import {useEffect, useState} from 'react'
//import data from '../api/newData'
import React, { PureComponent } from 'react';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, ReferenceLine, Tooltip, Legend, ResponsiveContainer } from 'recharts';
 
function LinesAddedGraph({data}) {
    //const [graphData, setGraphData] = useState();
    //const [loading, setLoading] = useState(true);
    //setGraphData(data);
    //setLoading(false);
    return (
      <ResponsiveContainer width="100%" height={400}>

              <BarChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <YAxis dataKey="total_additions"/>
          <XAxis dataKey="user" />
          <Tooltip />
          <Legend />
          <ReferenceLine y={0} stroke="#000" />
          <Bar dataKey="total_additions" fill="#8368a9" />
          <Bar dataKey="total_deletions" fill="#CC85DB" />
        </BarChart>
              </ResponsiveContainer>
    )
  }
  
  export default LinesAddedGraph;