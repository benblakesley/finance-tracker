'use client';

import { collection, doc, onSnapshot } from "firebase/firestore";
import { firestore } from "../../../firebase";
import { useAppDispatch, useAppSelector } from "@/state/hooks";
import { setExpenses, setMonthlyExpensesTotals, TransactionData, TransactionDataAndId } from "@/state/reducers/transactionsSlice";
import { ReactNode, useEffect } from "react";
import { calculateMonthlyTransactions } from "../helpers/calculateMonthlyTransactions";

export const ExpensesListener = ({children}: {children: ReactNode}) => 
{
    const dispatch = useAppDispatch();
    const {id} = useAppSelector(state => state.user);
    
    useEffect(() => 
    {
        if(!id)
        {
            return
        };

        // Get a reference to the user document
        const userRef = doc(firestore, "users", id);

        // Create a reference to the subcollection
        const expensesCollectionRef = collection(userRef, 'expenses');

        let expenses: TransactionDataAndId[] = [];

        const unsubscribe = onSnapshot(
        expensesCollectionRef, (snapshot) => {
        
        expenses = [...snapshot.docs].map((doc) => ({
            id: doc.id,
            ...doc.data() as TransactionData,
        }));
        
        dispatch(setExpenses(expenses));

        const monthlyExpenses = calculateMonthlyTransactions(expenses);

        const formattedMonthlyIncomes = monthlyExpenses.map((expense) => {
            return {date: expense.date, expenses: expense.transactions}
        });

        dispatch(setMonthlyExpensesTotals(formattedMonthlyIncomes));
        },
        (error) => 
        {
        console.error("Error listening to subcollection:", error);
        });

        return () => unsubscribe();
    }, [id])

    return (
        <>
            {children}
        </>
    );
}