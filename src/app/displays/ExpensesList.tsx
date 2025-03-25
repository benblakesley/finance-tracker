import { ExpenseDataAndId } from "@/state/reducers/expensesSlice"
import { Box, Button, IconButton, Typography } from "@mui/material";
import { useState } from "react";
import CancelIcon from "@mui/icons-material/Cancel";
import { deleteDoc, doc } from "firebase/firestore";
import { firestore } from "../../../firebase";
import { useAppSelector } from "@/state/hooks";

interface ExpensesListProps
{
    expenses: ExpenseDataAndId[];
}

export const ExpensesList = ({expenses}: ExpensesListProps) =>
{
    const {id} = useAppSelector(state => state.user);
    const initialVisibleCount = 3;
    const [visibleCount, setVisibleCount] = useState<number>(initialVisibleCount);

    const handleShowMore = () => {
        setVisibleCount((prev) => (prev + 5 > expenses.length ? expenses.length : prev + 5));
    };

    const handleHide = () => {
        setVisibleCount(3);
    }

    const handleDeleteExpense = async (expenseId: string) =>
    {
        try {
            await deleteDoc(doc(firestore, "users", id!, "expenses", expenseId));
            console.log("Document successfully deleted!");
          } catch (error) {
            console.error("Error deleting document:", error);
          }
    }

    return (
        <Box>
            <Typography p={1} variant="h6" sx={{fontWeight: 700}}>
                Expenses
            </Typography>
            {expenses.slice(0, visibleCount).map((expense => {
                return (
                    <Box display="flex" justifyContent="space-between" p={2} key={expense.id}>
                        <Typography>{expense.label}</Typography>
                        <Box display="flex" alignItems="center" gap={1}>
                            <Typography>£{expense.amount}</Typography>
                            <IconButton onClick={() => handleDeleteExpense(expense.id)}>
                                <CancelIcon sx={{ color: "red" }} />
                            </IconButton>
                        </Box>
                    </Box>
                )
            }))}
             {visibleCount < expenses.length ? <Button onClick={handleShowMore} fullWidth>
                Show More
            </Button>
            : (expenses.length > initialVisibleCount ? <Button onClick={handleHide} fullWidth>
                Hide
            </Button> : undefined)
            }
        </Box>
    )
}