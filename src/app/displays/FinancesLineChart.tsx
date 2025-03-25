'use client';

import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const data = [
  { name: "Jan", sales: 400, revenue: 2400 },
  { name: "Feb", sales: 800, revenue: 3000 },
  { name: "Mar", sales: 600, revenue: 2800 },
  { name: "Apr", sales: 1000, revenue: 3500 },
  { name: "May", sales: 1200, revenue: 4200 },
  { name: "Jun", sales: 900, revenue: 3900 },
  { name: "Jul", sales: 900, revenue: 3900 },
  { name: "Aug", sales: 900, revenue: 3900 },
  { name: "Sep", sales: 900, revenue: 3900 },
  { name: "Oct", sales: 900, revenue: 3900 },

];


export const FinancesLineChart = () =>
{
    return (
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 10 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="sales" stroke="#8884d8" strokeWidth={3} dot={{ r: 6 }} />
            <Line type="monotone" dataKey="revenue" stroke="#82ca9d" strokeWidth={3} dot={{ r: 6 }} />
          </LineChart>
        </ResponsiveContainer>
      );
}