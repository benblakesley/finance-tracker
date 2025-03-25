import { ExpenseDataAndId } from "@/state/reducers/expensesSlice";
import { YearMonthFormat } from "../add-expense/AddExpenseModal";
import dayjs from "dayjs";

export function calculateMonthlyExpenses(expenses: ExpenseDataAndId[])
{
    // Convert YYYY-MM strings to Date objects for comparison
    const parseDate = (str: string) => new Date(str + "-01");

    // Find min and max months
    const minMonth = Math.min(...expenses.map(exp => parseDate(exp.startDate).getTime()));
    let maxMonth = Math.max(...expenses.map(exp => exp.endDate ? parseDate(exp.endDate).getTime() : -1));

    const minMonthPlusOneYear = dayjs(minMonth).add(1, "year").valueOf();

    maxMonth = maxMonth === -1 ? minMonthPlusOneYear : maxMonth;

    const currentDate = new Date(minMonth);

    const result = [];

    // Loop from minMonth to maxMonth, moving month by month
    while (currentDate.getTime() <= maxMonth) {
        const yearMonth = currentDate.toISOString().slice(0, 7) as YearMonthFormat; // Format as 'YYYY-MM'

        // Calculate total expenses for the current month
        const total = expenses.reduce((sum, exp) => {
            const start = parseDate(exp.startDate);
            const end = parseDate(exp.endDate!);
            return currentDate >= start && currentDate <= end ? sum + exp.amount : sum;
        }, 0);

        result.push({date: yearMonth, expenses: total});

        // Move to the next month
        currentDate.setMonth(currentDate.getMonth() + 1);
    }

    return result;
}
