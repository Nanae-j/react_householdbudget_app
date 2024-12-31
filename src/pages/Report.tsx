import { Paper } from '@mui/material';
import Grid from '@mui/material/Grid2';
import React from 'react';
import CategoryChart from '../components/CategoryChart';
import MonthSelector from '../components/MonthSelector';
import TransactionTable from '../components/TransactionTable';
import BarChart from '../components/BarChart';
import { Transaction } from '../types';

interface ReportProps {
  currentMonth: Date;
  setCurrentMonth: React.Dispatch<React.SetStateAction<Date>>;
  monthlyTransactions: Transaction[];
  isLoading: boolean;
}

const Report = ({
  currentMonth,
  setCurrentMonth,
  monthlyTransactions,
  isLoading,
}: ReportProps) => {
  const commonPaperStyle = {
    height: '400px',
    display: 'flex',
    flexDirection: 'column',
    p: 2,
  };
  return (
    <Grid container spacing={2}>
      <Grid size={{ xs: 12 }}>
        {/* 日付選択エリア */}
        <MonthSelector
          currentMonth={currentMonth}
          setCurrentMonth={setCurrentMonth}
        />
      </Grid>
      <Grid size={{ xs: 12, md: 4 }}>
        <Paper sx={commonPaperStyle}>
          <CategoryChart
            monthlyTransactions={monthlyTransactions}
            isLoading={isLoading}
          />
        </Paper>
      </Grid>
      <Grid size={{ xs: 12, md: 8 }}>
        <Paper sx={commonPaperStyle}>
          {/* 棒グラフ */}
          <BarChart
            monthlyTransactions={monthlyTransactions}
            isLoading={isLoading}
          />
        </Paper>
      </Grid>
      <Grid size={{ xs: 12 }}>
        <TransactionTable />
      </Grid>
    </Grid>
  );
};

export default Report;
