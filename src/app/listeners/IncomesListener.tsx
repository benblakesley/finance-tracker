'use client';

import { collection, doc, onSnapshot } from "firebase/firestore";
import { firestore } from "../../../firebase";
import { useAppDispatch, useAppSelector } from "@/state/hooks";
import { setIncomes, setMonthlyIncomesTotals, TransactionData, TransactionDataAndId } from "@/state/reducers/transactionsSlice";
import { ReactNode, useEffect } from "react";
import { calculateMonthlyTransactions } from "../helpers/calculateMonthlyTransactions";

export const IncomesListener = ({children}: {children: ReactNode}) => 
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
        const incomesCollectionRef = collection(userRef, 'incomes');

        let incomes: TransactionDataAndId[] = [];

        const unsubscribe = onSnapshot(
        incomesCollectionRef, (snapshot) => {
        
        incomes = [...snapshot.docs].map((doc) => ({
            id: doc.id,
            ...doc.data() as TransactionData,
        }));
        
        dispatch(setIncomes(incomes));

        const monthlyIncomes = calculateMonthlyTransactions(incomes);

        const formattedMonthlyIncomes = monthlyIncomes.map((income) => {
            return {date: income.date, incomes: income.transactions}
        });

        dispatch(setMonthlyIncomesTotals(formattedMonthlyIncomes));
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