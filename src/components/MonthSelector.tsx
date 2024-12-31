import { Box, Button } from '@mui/material';
import React from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';
import { DatePicker, DatePickerToolbar } from '@mui/x-date-pickers/DatePicker';
import { ja } from 'date-fns/locale';
import { addMonths } from 'date-fns';

interface MonthSelectorProps {
  currentMonth: Date;
  setCurrentMonth: React.Dispatch<React.SetStateAction<Date>>;
}

const MonthSelector = ({
  currentMonth,
  setCurrentMonth,
}: MonthSelectorProps) => {
  const handlePreviousMonth = () => {
    const previousMonth = addMonths(currentMonth, -1);
    setCurrentMonth(previousMonth);
  };

  const handleNextMonth = () => {
    const nextMonth = addMonths(currentMonth, 1);
    setCurrentMonth(nextMonth);
  };

  const handleDateChange = (newDate: Date | null) => {
    if (newDate) {
      setCurrentMonth(newDate);
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ja}>
      <Box
        sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
      >
        <Button
          onClick={handlePreviousMonth}
          color={'error'}
          variant="contained"
        >
          先月
        </Button>
        <DatePicker
          onChange={handleDateChange}
          sx={{ mx: 2, background: 'white' }}
          label="年月を選択"
          value={currentMonth}
          views={['year', 'month']}
          format="yyyy/MM"
          slotProps={{
            calendarHeader: { format: 'yyyy/MM' },
            toolbar: {
              toolbarFormat: 'yyyy/MM',
            },
          }}
        />
        <Button onClick={handleNextMonth} color={'primary'} variant="contained">
          次月
        </Button>
      </Box>
    </LocalizationProvider>
  );
};

export default MonthSelector;
