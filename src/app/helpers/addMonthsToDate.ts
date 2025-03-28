import { YearMonthFormat } from "../add-transaction/AddTransactionModal";

export function addMonthsToDate(dateString: YearMonthFormat, monthsToAdd: number): YearMonthFormat
{
    // Parse the "YYYY-MM" format to a Date object
    const [year, month] = dateString.split('-');
    const date = new Date(Number(year), Number(month) - 1); // month is 0-based in JavaScript Date
  
    // Add the specified number of months
    date.setMonth(date.getMonth() + monthsToAdd);
  
    // Return the new date in "YYYY-MM" format
    const newYear = date.getFullYear();
    const newMonth = (date.getMonth() + 1).toString().padStart(2, '0'); // Ensure two digits
    return `${newYear}-${newMonth}` as YearMonthFormat;
  }