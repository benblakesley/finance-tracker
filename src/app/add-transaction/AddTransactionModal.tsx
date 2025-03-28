'use client';

import { Box, Button, Fade, FormControl, InputLabel, MenuItem, Modal, TextField, Typography } from "@mui/material"
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { ClientDatePicker } from "../displays/ClientDatePicker";
import { useState } from "react";
import { firestore } from "../../../firebase";
import { addDoc, collection, doc } from "firebase/firestore";
import { useAppSelector } from "@/state/hooks";
import { TransactionData, TransactionTypes } from "@/state/reducers/transactionsSlice";
import { addMonthsToDate } from "../helpers/addMonthsToDate";

interface AddTransactionModalProps
{
    open: boolean;
    handleClose: () => void;
    transactionType: TransactionTypes;
}

export type YearMonthFormat = `${number}-${number}`

export const AddTransactionModal = ({open, handleClose, transactionType}: AddTransactionModalProps) =>
{
    const [amount, setAmount] = useState<number | undefined>(undefined);
    const [startDate, setStartDate] = useState<YearMonthFormat| null>(null);
    const [endDate, setEndDate] = useState<YearMonthFormat | null>(null);
    const [label, setLabel] = useState<string>("");
    const [error, setError] = useState<string>("");
    const [numberOfMonths, setNumberOfMonths] = useState<number>(1);

    const {id} = useAppSelector(state => state.user);

    const resetAll = () =>
    {
        setStartDate(null);
        setEndDate(null);
        setLabel("");
        setError("");
        setAmount(undefined);
    }

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

    const handleEndDateChange = (event: SelectChangeEvent) => 
    {
        const numberOfMonths = Number(event.target.value);

        setNumberOfMonths(numberOfMonths);

        const finalDate = addMonthsToDate(startDate!, numberOfMonths);

        setEndDate(finalDate);

        console.log(numberOfMonths);

        console.log(finalDate);
    };
    
    const onAddTransaction = () =>
    {
        if (startDate && amount && label.length > 0 && endDate)
        {
            const transaction: TransactionData = {
                startDate: startDate,
                endDate: endDate,
                amount: amount,
                label: label,
                type: transactionType
            }

            // Get a reference to the user document
            const userRef = doc(firestore, "users", id!);

 
            // Add a document to the subcollection
            switch (transactionType) {
                case (TransactionTypes.Expense):
                    const expensesCollectionRef = collection(userRef, 'expenses');
                    addDoc(expensesCollectionRef, transaction);
                    break
                case (TransactionTypes.Income):
                    const incomesCollectionRef = collection(userRef, 'incomes');
                    addDoc(incomesCollectionRef, transaction);
            }
            onClose();
        }
        else
        {
            setError("Please fill in all required fields.")
        }
    }

    const onClose = () =>
    {
        resetAll();
        handleClose();
    };
    
    const numberOfMonthsArray = Array.from({ length: 61 }, (_, index) => index + 1);

    return (
        <Modal open={open} onClose={onClose} aria-labelledby="modal-title">
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
                    Add {transactionType}
                </Typography>
                <ClientDatePicker label="Start Date" handleDateChange={handleStartDateChange}/>

                {startDate && <Box sx={{mt: 2}}>
                    <FormControl fullWidth>
                        <InputLabel>Number of Months</InputLabel>
                        <Select
                        value={numberOfMonths.toString()}
                        label="Number of Months"
                        onChange={handleEndDateChange}
                        >
                        {numberOfMonthsArray.map((number: number) => {
                            return  <MenuItem key={number} value={number}>{number}</MenuItem>
                        })}
                        </Select>
                    </FormControl>
                </Box>}

                <TextField
                    fullWidth
                    label={`${transactionType} Amount`}
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
                    label={`${transactionType} Label`}
                    variant="outlined"
                    value={label}
                    onChange={handleLabelChange}
                    sx={{ mt: 2 }}
                />
                {error && <Typography color="error" variant="body2">{error}</Typography>}
                <Button onClick={onAddTransaction} sx={{ mt: 2, justifySelf: "center"}} variant="contained">
                    Add
                </Button>
        </Box>
        </Fade>
    </Modal>
    )
}