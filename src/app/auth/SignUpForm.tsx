'use client';

import { createUserWithEmailAndPassword } from "firebase/auth";
import { AuthForm, FormData } from "./AuthForm"
import { useState } from "react";
import { firebaseAuth } from "../../../firebase";
import { useRouter } from "next/navigation";

export const SignUpForm = () => 
{
    const [error, setError] = useState<string>("");
    const router = useRouter();

    const primaryText = "Sign Up";
    const secondaryButtonText = "Sign In";
    const secondaryText = "Already have an account?";

    const handleSignUp = async (formData: FormData) => 
    {
        const {email, password} = formData;

        if (!email || !password)
        {
            setError('Please fill in both fields');
        } else {
            try
            {
                await createUserWithEmailAndPassword(firebaseAuth, email, password);
        
                setError('');
            }
            catch (error)
            {
                setError('Uh-oh! Something went wrong!');
                console.log(error);
            }
        }
    };
    
    return (
        <AuthForm 
            primaryText={primaryText}
            secondaryButtonText={secondaryButtonText}
            secondaryText={secondaryText}
            onSubmit={handleSignUp}
            error={error}
            onSecondaryButtonClick={() => {router.push("/signin")}}
        />
    )
}