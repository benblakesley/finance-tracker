import { TransactionDataAndId } from "@/state/reducers/transactionsSlice";
import { YearMonthFormat } from "../add-transaction/AddTransactionModal";
import dayjs from "dayjs";

export function calculateMonthlyTransactions(transactions: TransactionDataAndId[])
{
    // Convert YYYY-MM strings to Date objects for comparison
    const parseDate = (str: string) => new Date(str + "-01");

    // Find min and max months
    const minMonth = Math.min(...transactions.map(transaction => parseDate(transaction.startDate).getTime()));
    let maxMonth = Math.max(...transactions.map(transaction => transaction.endDate ? parseDate(transaction.endDate).getTime() : -1));

    const minMonthPlusOneYear = dayjs(minMonth).add(1, "year").valueOf();

    maxMonth = maxMonth === -1 ? minMonthPlusOneYear : maxMonth;

    const currentDate = new Date(minMonth);

    const result = [];

    // Loop from minMonth to maxMonth, moving month by month
    while (currentDate.getTime() <= maxMonth) {
        const yearMonth = currentDate.toISOString().slice(0, 7) as YearMonthFormat; // Format as 'YYYY-MM'

        const total = transactions.reduce((sum, transaction) => {
            const start = parseDate(transaction.startDate);
            const end = parseDate(transaction.endDate!);
            return currentDate >= start && currentDate <= end ? sum + transaction.amount : sum;
        }, 0);

        result.push({date: yearMonth, transactions: total});

        // Move to the next month
        currentDate.setMonth(currentDate.getMonth() + 1);
    }

    return result;
}
