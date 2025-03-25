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

export default function Home() 
{
    const [addExpenseModalOpen, setAddExpenseModalOpen] = useState<boolean>(false);

    const {id} = useAppSelector(state => state.user);
    const {expenses} = useAppSelector(state => state.expenses);
    
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
            <FinancesLineChart/>
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
