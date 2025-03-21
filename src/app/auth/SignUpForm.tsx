'use client';

import { createUserWithEmailAndPassword } from "firebase/auth";
import { AuthForm, FormData } from "./AuthForm"
import { useEffect, useState } from "react";
import { firebaseAuth } from "../../../firebase";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/state/hooks";

export const SignUpForm = () => 
{
    const [error, setError] = useState<string>("");
    const router = useRouter();
    const {id} = useAppSelector(state => state.user);

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
        
                router.push("/");

                setError('');
            }
            catch (error)
            {
                setError('Uh-oh! Something went wrong!');
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
            onSubmit={handleSignUp}
            error={error}
            onSecondaryButtonClick={() => {router.push("/signin")}}
        />
    )
}