'use client';

import { signInWithEmailAndPassword } from "firebase/auth";
import { AuthForm, FormData } from "./AuthForm"
import { useEffect, useState } from "react";
import { firebaseAuth } from "../../../firebase";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/state/hooks";

export const SignInForm = () => 
{
    const [error, setError] = useState<string>("");
    const router = useRouter();

    const {id} = useAppSelector(state => state.user);
    
    const primaryText = "Sign In";
    const secondaryButtonText = "Sign Up";
    const secondaryText = "Don't have an account?";

    const handleSignIn = async (formData: FormData) => 
    {
        const {email, password} = formData;

    if (!email || !password)
    {
        setError('Please fill in both fields');
    } else {
        try
        {
            await signInWithEmailAndPassword(firebaseAuth, email, password);
    
            router.push("/");

            setError('');
        }
        catch (error)
        {
            setError('Invalid credentials');
            console.log(error);
        }
    }
    };

    useEffect(() => {
        if (id)
        {
            router.push("/");
        }
    }, [id]);
    
    return (
        <AuthForm 
            primaryText={primaryText}
            secondaryButtonText={secondaryButtonText}
            secondaryText={secondaryText}
            onSubmit={handleSignIn}
            error={error}
            onSecondaryButtonClick={() => {
                router.push("/signup")}}
        />
    )
}