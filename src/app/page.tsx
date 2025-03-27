'use client';

import { useAppSelector } from "@/state/hooks";
import { Box, Button } from "@mui/material";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { LoadingPage } from "./loading/LoadingPage";
import { TopBar } from "./top-bar/TopBar";
import { FinancesLineChart } from "./displays/FinancesLineChart";
import { AddTransactionModal } from "./add-transaction/AddTransactionModal";
import { TransactionsList } from "./displays/TransactionsList";
import { Timelines, TimelineTabs } from "./displays/TimelineTabs";
import { TransactionTypes } from "@/state/reducers/transactionsSlice";

export default function Home() 
{
    const [addExpenseModalOpen, setAddExpenseModalOpen] = useState<boolean>(false);
    const [addIncomeModalOpen, setAddIncomeModalOpen] = useState<boolean>(false);
    const {id} = useAppSelector(state => state.user);
    const {expenses, monthlyExpensesTotals, incomes, monthlyIncomesTotals} = useAppSelector(state => state.transactions);
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
            <AddTransactionModal transactionType={TransactionTypes.Expense} open={addExpenseModalOpen} handleClose={() => {setAddExpenseModalOpen(false)}}/>
            <AddTransactionModal transactionType={TransactionTypes.Income} open={addIncomeModalOpen} handleClose={() => {setAddIncomeModalOpen(false)}}/>
            { (monthlyExpensesTotals.length > 0 || monthlyIncomesTotals.length > 0) && 
            <>   
              <TimelineTabs timeline={timeline} setTimeline={setTimeline}/>
              <FinancesLineChart timeline={timeline}/>
            </>
            }
            
            <Box sx={{display: "flex", flexDirection: "row", justifyContent: "center"}}>
              <Button onClick={() => setAddExpenseModalOpen(true)}>
                Add Expense
              </Button>
              <Button onClick={() => setAddIncomeModalOpen(true)}>
                Add Income
              </Button>
            </Box>
            <TransactionsList transactions={expenses} type={TransactionTypes.Expense}/>
            <TransactionsList transactions={incomes} type={TransactionTypes.Income}/>
          </Box> :
          <Box>
            <LoadingPage/>
          </Box>}
      </Box>
    );
}
