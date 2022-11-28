import {useEffect, useState} from 'react'
//import data from '../api/newData'
import React, { PureComponent } from 'react';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

function MergesGraph({data}) {
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
                <YAxis dataKey="merges"/>
                <Tooltip />
                <Legend />
                <Bar dataKey="merges" fill="#db5a6b" />
              </BarChart>
    )
  }
  
  export default MergesGraph;