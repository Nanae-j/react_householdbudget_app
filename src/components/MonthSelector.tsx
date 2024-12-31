import { Box, Button } from '@mui/material';
import React from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';
import { DatePicker, DatePickerToolbar } from '@mui/x-date-pickers/DatePicker';
import { ja } from 'date-fns/locale';

const MonthSelector = () => {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ja}>
      <Box
        sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
      >
        <Button color={'error'} variant="contained">
          先月
        </Button>
        <DatePicker
          sx={{ mx: 2, background: 'white' }}
          label="年月を選択"
          views={['year', 'month']}
          format="yyyy/MM"
          slotProps={{
            calendarHeader: { format: 'yyyy/MM' },
            toolbar: {
              toolbarFormat: 'yyyy/MM',
            },
          }}
        />
        <Button color={'primary'} variant="contained">
          次月
        </Button>
      </Box>
    </LocalizationProvider>
  );
};

export default MonthSelector;
