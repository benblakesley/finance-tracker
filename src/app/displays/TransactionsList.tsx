import { TransactionDataAndId, TransactionTypes } from "@/state/reducers/transactionsSlice"
import { Box, Button, IconButton, Typography } from "@mui/material";
import { useState } from "react";
import CancelIcon from "@mui/icons-material/Cancel";
import { deleteDoc, doc } from "firebase/firestore";
import { firestore } from "../../../firebase";
import { useAppSelector } from "@/state/hooks";
import EditIcon from "@mui/icons-material/Edit";

interface TransactionsListProps
{
    transactions: TransactionDataAndId[];
    type: TransactionTypes;
    onEditTransaction: (transactionId: string, type: TransactionTypes) => void;
}

export const TransactionsList = ({transactions, type, onEditTransaction}: TransactionsListProps) =>
{
    const {id} = useAppSelector(state => state.user);
    const initialVisibleCount = 3;
    const [visibleCount, setVisibleCount] = useState<number>(initialVisibleCount);

    const handleShowMore = () => {
        setVisibleCount((prev) => (prev + 5 > transactions.length ? transactions.length : prev + 5));
    };

    const handleHide = () => {
        setVisibleCount(3);
    }

    const handleDeleteTransaction = async (transactionId: string) =>
    {
        try {
            switch (type) {
                case (TransactionTypes.Expense):
                    await deleteDoc(doc(firestore, "users", id!, "expenses", transactionId));
                    console.log("Document successfully deleted!");
                    break
                case (TransactionTypes.Income):
                    await deleteDoc(doc(firestore, "users", id!, "incomes", transactionId));
                    console.log("Document successfully deleted!");
                    break
            }
          } catch (error) {
            console.error("Error deleting document:", error);
          }
    }

    const handleClickEditButton = (transactionId: string, type: TransactionTypes) =>
    {
        onEditTransaction(transactionId, type);
    }

    return (
        <Box>
            <Typography p={1} variant="h6" sx={{fontWeight: 700}}>
                {type}s
            </Typography>
            {transactions.slice(0, visibleCount).map((transaction => {
                return (
                    <Box display="flex" justifyContent="space-between" p={2} key={transaction.id}>
                        <Typography>{transaction.label}</Typography>
                        <Box display="flex" alignItems="center" gap={1}>
                            <Typography>£{transaction.amount}</Typography>
                            <IconButton onClick={() => handleClickEditButton(transaction.id, transaction.type)}>
                                <EditIcon sx={{color: "white"}} />
                            </IconButton>
                            <IconButton onClick={() => handleDeleteTransaction(transaction.id)}>
                                <CancelIcon sx={{color: "red"}} />
                            </IconButton>
                        </Box>
                    </Box>
                )
            }))}
             {visibleCount < transactions.length ? <Button onClick={handleShowMore} fullWidth>
                Show More
            </Button>
            : (transactions.length > initialVisibleCount ? <Button onClick={handleHide} fullWidth>
                Hide
            </Button> : undefined)
            }
        </Box>
    )
}