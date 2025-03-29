'use client';

import { useAppSelector } from "@/state/hooks";
import { Box, Button, Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { LoadingPage } from "./loading/LoadingPage";
import { TopBar } from "./top-bar/TopBar";
import { FinancesLineChart } from "./displays/FinancesLineChart";
import { AddTransactionModal } from "./add-transaction/AddTransactionModal";
import { TransactionsList } from "./displays/TransactionsList";
import { Timelines, TimelineTabs } from "./displays/TimelineTabs";
import { TransactionData, TransactionTypes } from "@/state/reducers/transactionsSlice";
import { TransactionInfoModal } from "./transaction-info/TransactionInfoModal";

export default function Home() 
{
    const [addExpenseModalOpen, setAddExpenseModalOpen] = useState<boolean>(false);
    const [addIncomeModalOpen, setAddIncomeModalOpen] = useState<boolean>(false);
    const {id} = useAppSelector(state => state.user);
    const {expenses, monthlyExpensesTotals, incomes, monthlyIncomesTotals} = useAppSelector(state => state.transactions);
    const [timeline, setTimeline] = useState<Timelines>(Timelines.SixMonths);
    const transactionIdToEdit = useRef("");
    const [transactionInfo, setTransactionInfo] = useState<TransactionData | undefined>(undefined);

    const router = useRouter();

    useEffect(() =>
    {
      if(!id)
      {
        router.push("/signin")
      }
    }, [id]);

    const transactionsExist = (monthlyExpensesTotals.length > 0 || monthlyIncomesTotals.length > 0);

    const onEditTransaction = (transactionId: string, type: TransactionTypes) => 
    {
      transactionIdToEdit.current = transactionId;
      switch(type) {
        case (TransactionTypes.Expense):
          setAddExpenseModalOpen(true);
          break;
        case (TransactionTypes.Income):
          setAddIncomeModalOpen(true);
          break;
      }
    }

    useEffect(() => {
      transactionIdToEdit.current = "";
    }, [addExpenseModalOpen, addIncomeModalOpen]);

    const onViewTransactionInfo = (transaction: TransactionData) =>
    {
        setTransactionInfo(transaction);
    }

    return (
      <Box>
          {id ?
          <Box>
            <TopBar/>
            <AddTransactionModal transactionId={transactionIdToEdit.current} transactionType={TransactionTypes.Expense} open={addExpenseModalOpen} handleClose={() => {setAddExpenseModalOpen(false)}}/>
            <AddTransactionModal transactionId={transactionIdToEdit.current} transactionType={TransactionTypes.Income} open={addIncomeModalOpen} handleClose={() => {setAddIncomeModalOpen(false)}}/>
            {transactionInfo && <TransactionInfoModal transaction={transactionInfo} open={!!transactionInfo} handleClose={() =>{setTransactionInfo(undefined)}}/>}
            {transactionsExist &&
            <>   
              <TimelineTabs timeline={timeline} setTimeline={setTimeline}/>
              <FinancesLineChart timeline={timeline}/>
            </>
            }
            {!transactionsExist && <Box>
              <Typography sx={{mt: 10, color: "#80EFFF" , fontWeight: 800, textAlign: "center", fontSize: {xs: "2em", sm: "2em"}}}>
                  To get started, add an Expense or an Income!
              </Typography>
            </Box>}
            <Box sx={{display: "flex", flexDirection: "row", justifyContent: "center"}}>
              <Button onClick={() => setAddExpenseModalOpen(true)}>
                Add Expense
              </Button>
              <Button onClick={() => setAddIncomeModalOpen(true)}>
                Add Income
              </Button>
            </Box>
            {transactionsExist && 
            <Box sx={{display: "flex", flexDirection: { xs: "column", sm: "row" }}}>
              <Box sx={{ flex: 1 }}>
                <TransactionsList transactions={expenses} type={TransactionTypes.Expense} onEditTransaction={onEditTransaction} onViewTransactionInfo={onViewTransactionInfo}/>
              </Box>
              <Box sx={{ flex: 1 }}>
                <TransactionsList transactions={incomes} type={TransactionTypes.Income} onEditTransaction={onEditTransaction} onViewTransactionInfo={onViewTransactionInfo}/>
              </Box>
            </Box>
            }
          </Box> :
          <Box>
            <LoadingPage/>
          </Box>}
      </Box>
    );
}
