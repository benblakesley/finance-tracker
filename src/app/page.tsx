'use client';

import { useAppSelector } from "@/state/hooks";
import { Box, Button } from "@mui/material";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { LoadingPage } from "./loading/LoadingPage";
import { TopBar } from "./top-bar/TopBar";
import { FinancesLineChart } from "./displays/FinancesLineChart";
import { AddExpenseModal } from "./add-expense/AddExpenseModal";
import { ExpensesList } from "./displays/ExpensesList";
import { Timelines, TimelineTabs } from "./displays/TimelineTabs";

export default function Home() 
{
    const [addExpenseModalOpen, setAddExpenseModalOpen] = useState<boolean>(false);
    const {id} = useAppSelector(state => state.user);
    const {expenses, monthlyExpensesTotals} = useAppSelector(state => state.expenses);
    const [timeline, setTimeline] = useState<Timelines>(Timelines.SixMonths);

    const router = useRouter();

    useEffect(() =>
    {
      if(!id)
      {
        router.push("/signin")
      }
    }, [id]);

    return (
      <Box>
          {id ?
          <Box>
            <TopBar/>
            <AddExpenseModal open={addExpenseModalOpen} handleClose={() => {setAddExpenseModalOpen(false)}}/>
            { monthlyExpensesTotals.length > 0 && 
            <>
              
              <TimelineTabs timeline={timeline} setTimeline={setTimeline}/>
              <FinancesLineChart timeline={timeline}/>
            </>
            }
            
            <Box sx={{display: "flex", flexDirection: "row", justifyContent: "center"}}>
              <Button onClick={() => setAddExpenseModalOpen(true)}>
                Add Expense
              </Button>
              <Button>
                Add Income
              </Button>
            </Box>
            <ExpensesList expenses={expenses}/>
          </Box> :
          <Box>
            <LoadingPage/>
          </Box>}
      </Box>
    );
}
