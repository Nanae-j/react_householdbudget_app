import { Paper } from '@mui/material';
import Grid from '@mui/material/Grid2';
import React from 'react';
import CategoryChart from '../components/CategoryChart';
import MonthSelector from '../components/MonthSelector';
import TransactionTable from '../components/TransactionTable';
import BarChart from '../components/BarChart';

const Report = () => {
  const commonPaperStyle = {
    height: { xs: 'auto', md: '400px' },
    display: 'flex',
    flexDirection: 'column',
  };
  return (
    <Grid container spacing={2}>
      <Grid size={{ xs: 12 }}>
        {/* 日付選択エリア */}
        <MonthSelector />
      </Grid>
      <Grid size={{ xs: 12, md: 4 }}>
        <Paper sx={commonPaperStyle}>
          <CategoryChart />
        </Paper>
      </Grid>
      <Grid size={{ xs: 12, md: 8 }}>
        <Paper sx={commonPaperStyle}>
          <BarChart />
        </Paper>
      </Grid>
      <Grid size={{ xs: 12 }}>
        <TransactionTable />
      </Grid>
    </Grid>
  );
};

export default Report;
