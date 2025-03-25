import { YearMonthFormat } from "@/app/add-expense/AddExpenseModal";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ExpenseData
{
    startDate: YearMonthFormat;
    endDate: YearMonthFormat | null;
    amount: number;
    label: string;
}

export interface ExpenseDataAndId extends ExpenseData
{
    id: string;
}

interface ExpensesState
{
    expenses: ExpenseDataAndId[];
    monthlyExpensesTotals: {date: YearMonthFormat, expenses: number}[];
}

const initialState: ExpensesState =
{
    expenses: [],
    monthlyExpensesTotals: []
}

const expensesSlice = createSlice({
    name: 'slice',
    initialState: initialState,
    reducers: {
        setExpenses: (state: ExpensesState, action: PayloadAction<ExpenseDataAndId[]>) =>
        {
            state.expenses = action.payload;
        },
        setMonthlyExpensesTotals: (state: ExpensesState, action: PayloadAction<{date: YearMonthFormat, expenses: number}[]>) =>
        {
            state.monthlyExpensesTotals = action.payload
        }
    }
})

export const {setExpenses, setMonthlyExpensesTotals} = expensesSlice.actions;

export const expensesReducer =  expensesSlice.reducer;