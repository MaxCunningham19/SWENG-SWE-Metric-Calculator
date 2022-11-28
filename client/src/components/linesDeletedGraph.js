import {useEffect, useState} from 'react'
//import data from '../api/newData'
import React, { PureComponent } from 'react';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

function LinesDeletedGraph({data}) {
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