'use client';

import { collection, doc, onSnapshot } from "firebase/firestore";
import { firestore } from "../../../firebase";
import { useAppDispatch, useAppSelector } from "@/state/hooks";
import { Unsubscribe } from "firebase/auth";
import { ExpenseData, ExpenseDataAndId, setExpenses } from "@/state/reducers/expensesSlice";
import { ReactNode, useEffect } from "react";

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