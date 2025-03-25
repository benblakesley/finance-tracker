'use client'

import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { firebaseAuth, firestore } from "../../../firebase";
import { ReactNode, useEffect, useState } from "react";
import { useAppDispatch } from "@/state/hooks";
import {setUserId} from "@/state/reducers/userSlice";

export const AuthListener = ({children}: {children: ReactNode}) =>
{   
    const dispatch = useAppDispatch();
    
    useEffect(() => 
        {
            const unsubscibe = onAuthStateChanged(firebaseAuth, async (user) => {
    
            if(user)
            {
                const userRef = doc(firestore, "users", user.uid);
                
                const userDocSnap = await getDoc(userRef); //Check if user exists already
    
                if (!userDocSnap.exists()){
                    const userRef = doc(firestore, "users", user.uid);
                    const newUser = { id: user.uid, email: user.email! };
                    await setDoc(userRef, newUser);
                }
                dispatch(setUserId(user.uid));
            }
            else
            {
                dispatch(setUserId(undefined));
            }
          })
    
          return () => unsubscibe();
        }, []);


        return (
            <>
                {children}
            </>
        )
}