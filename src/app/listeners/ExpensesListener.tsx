'use client';

import { collection, doc, onSnapshot } from "firebase/firestore";
import { firestore } from "../../../firebase";
import { useAppDispatch, useAppSelector } from "@/state/hooks";
import { ExpenseData, ExpenseDataAndId, setExpenses, setMonthlyExpensesTotals } from "@/state/reducers/expensesSlice";
import { ReactNode, useEffect } from "react";
import { calculateMonthlyExpenses } from "../helpers/calculateMonthlyExpenses";

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

        let expenses: ExpenseDataAndId[] = [];

        const unsubscribe = onSnapshot(
        expensesCollectionRef, (snapshot) => {
        
        expenses = [...snapshot.docs].map((doc) => ({
            id: doc.id,
            ...doc.data() as ExpenseData,
        }));
        
        dispatch(setExpenses(expenses));

        dispatch(setMonthlyExpensesTotals(calculateMonthlyExpenses(expenses)));
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