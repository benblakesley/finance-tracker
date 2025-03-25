'use client';

import { useAppSelector } from "@/state/hooks";
import React from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Timelines } from "./TimelineTabs";

interface FinancesLineChartProps
{
    timeline: Timelines
};

export const FinancesLineChart = ({timeline}: FinancesLineChartProps) =>
{
    const {monthlyExpensesTotals} = useAppSelector(state => state.expenses);

    const slicedData = () => {
      switch (timeline) {
        case Timelines.ThreeMonths:
          return monthlyExpensesTotals.slice(0,3);
        case Timelines.SixMonths:
          return monthlyExpensesTotals.slice(0,6);
        case Timelines.OneYear:
            return monthlyExpensesTotals.slice(0,12);
        case Timelines.FiveYears:
          return monthlyExpensesTotals.slice(0,60);
      }
    };

    return (
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={slicedData()} margin={{ top: 20, right: 30, left: 20, bottom: 10 }}>
            <XAxis dataKey="date" />
            <YAxis/>
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="expenses" stroke="red" strokeWidth={3} dot={{ r: 6 }} />
          </LineChart>
        </ResponsiveContainer>
      );
}