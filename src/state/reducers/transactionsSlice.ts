import { YearMonthFormat } from "@/app/add-transaction/AddTransactionModal";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const enum TransactionTypes
{
    Income = "income",
    Expense = "expense"
}

export interface TransactionData
{
    startDate: YearMonthFormat;
    endDate: YearMonthFormat;
    amount: number;
    label: string;
    type: TransactionTypes;
}

export interface TransactionDataAndId extends TransactionData
{
    id: string;
}

interface TransactionsState
{
    expenses: TransactionDataAndId[];
    monthlyExpensesTotals: {date: YearMonthFormat, expenses: number}[];
    incomes: TransactionDataAndId[];
    monthlyIncomesTotals: {date: YearMonthFormat, incomes: number}[];
}

const initialState: TransactionsState =
{
    expenses: [],
    monthlyExpensesTotals: [],
    incomes: [],
    monthlyIncomesTotals: []
}

const transactionsSlice = createSlice({
    name: 'slice',
    initialState: initialState,
    reducers: {
        setExpenses: (state: TransactionsState, action: PayloadAction<TransactionDataAndId[]>) =>
        {
            state.expenses = action.payload;
        },
        setMonthlyExpensesTotals: (state: TransactionsState, action: PayloadAction<{date: YearMonthFormat, expenses: number}[]>) =>
        {
            state.monthlyExpensesTotals = action.payload
        },
        setIncomes: (state: TransactionsState, action: PayloadAction<TransactionDataAndId[]>) =>
        {
            state.incomes = action.payload;
        },
        setMonthlyIncomesTotals: (state: TransactionsState, action: PayloadAction<{date: YearMonthFormat, incomes: number}[]>) =>
        {
            state.monthlyIncomesTotals = action.payload
        }
    }
})

export const {setExpenses, setMonthlyExpensesTotals, setIncomes, setMonthlyIncomesTotals} = transactionsSlice.actions;

export const transactionsReducer =  transactionsSlice.reducer;