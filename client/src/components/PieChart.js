import {useEffect, useState} from 'react'
//import data from '../api/newData'
import React, { PureComponent } from 'react';
import { PieChart, Pie, Sector, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { Typography } from '@mui/material';

function MergesGraph({data}) {
    
    const data1 = [
        { "name": 'Group A', "total_additions": 400 },
        { "name": 'Group A', "total_additions": 400 },
        { "name": 'Group A', "total_additions": 400 },
        { "name": 'Group A', "total_additions": 400 },
      ];
    
    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
      
      const RADIAN = Math.PI / 180;
    return (
        <ResponsiveContainer width="100%" height={400}>
        <PieChart width={400} height={400}>
          <Pie
            dataKey="yes"
            isAnimationActive={false}
            data={data}
            cx="50%"
            cy="50%"
            outerRadius={80}
            fill="#8884d8"
            label
          />
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    )
  }
  
  export default MergesGraph;