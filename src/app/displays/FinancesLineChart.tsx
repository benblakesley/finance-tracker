'use client';

import { useAppSelector } from "@/state/hooks";
import React from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Timelines } from "./TimelineTabs";
import { YearMonthFormat } from "../add-transaction/AddTransactionModal";

interface FinancesLineChartProps
{
    timeline: Timelines
};

export const FinancesLineChart = ({timeline}: FinancesLineChartProps) =>
{
    const {monthlyExpensesTotals, monthlyIncomesTotals} = useAppSelector(state => state.transactions);

    const mergedData: {date: YearMonthFormat, expenses: number, incomes: number}[] = [];

    // Get the current year and month in YYYY-MM format
    const today = new Date();
    const currentMonth = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}`;

    // Helper function to find an entry by date
    const findOrCreateEntry = (date: YearMonthFormat) => {
      let entry = mergedData.find(item => item.date === date);
      if (!entry) {
        entry = { date, expenses: 0, incomes: 0 };
        mergedData.push(entry);
      }
      return entry;
    };

    // Merge expenses
    monthlyExpensesTotals.forEach(({ date, expenses }) => {
      findOrCreateEntry(date).expenses = expenses;
    });

    // Merge incomes
    monthlyIncomesTotals.forEach(({ date, incomes }) => {
      findOrCreateEntry(date).incomes = incomes;
    });

    // Sort by date
    mergedData.sort((a, b) => a.date.localeCompare(b.date));
    
    // Filter mergedData to only include current month and future months
    const futureData = mergedData.filter(item => item.date >= currentMonth);

    // Then slice based on timeline
    const slicedData = () => {
      switch (timeline) {
        case Timelines.ThreeMonths:
          return futureData.slice(0, 3);
        case Timelines.SixMonths:
          return futureData.slice(0, 6);
        case Timelines.OneYear:
          return futureData.slice(0, 12);
        case Timelines.FiveYears:
          return futureData.slice(0, 60);
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
            <Line type="monotone" dataKey="incomes" stroke="green" strokeWidth={3} dot={{ r: 6 }} />
          </LineChart>
        </ResponsiveContainer>
      );
}