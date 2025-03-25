'use client';

import { Box, Button, Fade, Modal, Switch, TextField, Typography } from "@mui/material"
import { ClientDatePicker } from "../displays/ClientDatePicker";
import { useState } from "react";
import { firestore } from "../../../firebase";
import { addDoc, collection, doc } from "firebase/firestore";
import { useAppSelector } from "@/state/hooks";
import { ExpenseData } from "@/state/reducers/expensesSlice";

interface AddExpenseModalProps
{
    open: boolean;
    handleClose: () => void;
}

export type YearMonthFormat = `${number}-${number}`

export const AddExpenseModal = ({open, handleClose}: AddExpenseModalProps) =>
{
    const [amount, setAmount] = useState<number | undefined>(undefined);
    const [startDate, setStartDate] = useState<YearMonthFormat| null>(null);
    const [endDate, setEndDate] = useState<YearMonthFormat | null>(null);
    const [label, setLabel] = useState<string>("");
    const [error, setError] = useState<string>("");
    const [hasEndDate, setHasEndDate] = useState<boolean>(true);

    const {id} = useAppSelector(state => state.user);

    const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => 
    {
        const value = event.target.value;

        setAmount(value ? Number(value) : undefined);
    };

    const handleLabelChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    {
        const value = event.target.value;
        setLabel(value);
    };

    const handleStartDateChange = (date: YearMonthFormat | null) =>
    {
        setStartDate(date);
    };

    const handleEndDateChange = (date: YearMonthFormat | null) =>
    {
        setEndDate(date);
    };

    const onAddExpense = () =>
    {
        if (startDate && amount && label.length > 0)
        {
            const expense: ExpenseData = {
                startDate: startDate,
                endDate: endDate,
                amount: amount,
                label: label
            }

            // Get a reference to the user document
            const userRef = doc(firestore, "users", id!);

            // Create a reference to the subcollection
            const subcollectionRef = collection(userRef, 'expenses');
 
            // Add a document to the subcollection
            addDoc(subcollectionRef, expense)

            handleClose();
            setError("");
        }
        else
        {
            setError("Please fill in all required fields.")
        }
    }

    return (
        <Modal open={open} onClose={handleClose} aria-labelledby="modal-title">
            <Fade in={open}>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: 300,
                    bgcolor: "background.paper",
                    boxShadow: 24,
                    p: 4,
                    borderRadius: 2,
                }}
            >
                <Typography variant="h4" textAlign="center">
                    Add Expense
                </Typography>
                <ClientDatePicker label="Start Date" handleDateChange={handleStartDateChange}/>
                {hasEndDate && <ClientDatePicker label="End Date" handleDateChange={handleEndDateChange}/>}
                <Box sx={{display: "flex", alignItems: "center", justifyContent: "space-between"}}>
                    <Typography>
                        Does this expense have an end date?
                    </Typography>
                    <Switch checked={hasEndDate} onChange={() => setHasEndDate(!hasEndDate)}/>
                </Box>
                
                <TextField
                    fullWidth
                    label="Expense Amount"
                    variant="outlined"
                    value={amount}
                    onChange={handleAmountChange}
                    sx={{ mt: 2 }}
                    slotProps={{
                        input: {
                          inputMode: "numeric",
                        },
                    }}
                />
                <TextField
                    fullWidth
                    label="Expense Label"
                    variant="outlined"
                    value={label}
                    onChange={handleLabelChange}
                    sx={{ mt: 2 }}
                />
                {error && <Typography color="error" variant="body2">{error}</Typography>}
                <Button onClick={onAddExpense} sx={{ mt: 2, justifySelf: "center"}} variant="contained">
                    Add
                </Button>
        </Box>
        </Fade>
    </Modal>
    )
}