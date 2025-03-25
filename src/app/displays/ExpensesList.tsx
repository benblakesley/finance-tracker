import { ExpenseDataAndId } from "@/state/reducers/expensesSlice"
import { Box, Button, Typography } from "@mui/material";
import { useState } from "react";

interface ExpensesListProps
{
    expenses: ExpenseDataAndId[];
}

export const ExpensesList = ({expenses}: ExpensesListProps) =>
{
    const [visibleCount, setVisibleCount] = useState<number>(3);

    const handleShowMore = () => {
        setVisibleCount((prev) => (prev + 5 > expenses.length ? expenses.length : prev + 5));
    };

    const handleHide = () => {
        setVisibleCount(3);
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
                        <Typography>£{expense.amount}</Typography>
                    </Box>
                )
            }))}
             {visibleCount < expenses.length ? <Button onClick={handleShowMore} fullWidth>
                Show More
            </Button>
            : <Button onClick={handleHide} fullWidth>
                Hide
            </Button>
            }
        </Box>
    )
}