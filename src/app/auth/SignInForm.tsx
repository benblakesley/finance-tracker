'use client';

import { signInWithEmailAndPassword } from "firebase/auth";
import { AuthForm, FormData } from "./AuthForm"
import { useState } from "react";
import { firebaseAuth } from "../../../firebase";
import { useRouter } from "next/navigation";

export const SignInForm = () => 
{
    const [error, setError] = useState<string>("");
    const router = useRouter();
    
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
    
            setError('');
        }
        catch (error)
        {
            setError('Invalid credentials');
            console.log(error);
        }
    }
    };
    
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