import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs, { Dayjs } from "dayjs";
import { YearMonthFormat } from '../add-expense/AddExpenseModal';

interface ClientDatePickerProps
{
    label: string;
    handleDateChange: (date: YearMonthFormat | null) => void;
}

export const ClientDatePicker = ({label, handleDateChange}: ClientDatePickerProps) => 
{
    const onDateChanged = (newDate: Dayjs | null) => 
    {
        const formattedDate  = newDate ? newDate.format("YYYY-MM") as YearMonthFormat : null;
        handleDateChange(formattedDate);
    };

    return (
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={['DatePicker']}>
          <DatePicker 
            sx={{width: "100%"}}
            label={label}
            onChange={onDateChanged}
            views={["year", "month"]}
            minDate={dayjs().startOf("month")}
            maxDate={dayjs().add(5, "year").endOf("month")}
          />
        </DemoContainer>
      </LocalizationProvider>
    )
}