import React, { useState } from 'react';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  ChartData,
} from 'chart.js';
import { Pie } from 'react-chartjs-2';
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from '@mui/material';
import {
  ExpenseCategory,
  IncomeCategory,
  Transaction,
  TransactionType,
} from '../types';
import CircularProgress from '@mui/material/CircularProgress';

ChartJS.register(ArcElement, Tooltip, Legend);

interface CategoryChart {
  monthlyTransactions: Transaction[];
  isLoading: boolean;
}

const CategoryChart = ({ monthlyTransactions, isLoading }) => {
  const [selectedType, setSelectedType] = useState<TransactionType>('expense');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setSelectedType(e.target.value as TransactionType);
  };

  // 現在選択中の収支タイプのみの取引を取得
  const categorySums = monthlyTransactions
    .filter((transaction) => transaction.type === selectedType)
    .reduce((acc, transaction) => {
      if (!acc[transaction.category]) {
        acc[transaction.category] = 0;
      }
      // '食費'のカテゴリーの時には処理中のtransactionの金額を足していく
      // 1回目の時にundefind + 100 などになりNanになる 初期化処理が必要
      acc[transaction.category] += transaction.amount;
      return acc;
    }, {} as Record<IncomeCategory | ExpenseCategory, number>);

  const categoryLabels = Object.keys(categorySums);
  const categoryValues: number[] = Object.values(categorySums);

  const options = {
    maintainAspectRatio: false,
    responsive: true,
  };

  const data: ChartData<'pie'> = {
    labels: categoryLabels,
    datasets: [
      {
        data: categoryValues,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <>
      <TextField
        id={'selct-type-label'}
        label="収支の種類"
        select
        fullWidth
        value={selectedType}
        onChange={handleChange}
        slotProps={{
          inputLabel: {
            htmlFor: 'category',
          },
          input: {
            id: 'category',
          },
        }}
      >
        <MenuItem value={'income'}>収入</MenuItem>
        <MenuItem value={'expense'}>支出</MenuItem>
      </TextField>

      {/* <FormControl fullWidth>
        <InputLabel id="type-select-label">収支の種類</InputLabel>
        <Select
          labelId="type-select-label"
          id="type-select"
          value={selectedType}
          label="収支の種類"
          onChange={handleChange}
        >
          <MenuItem value="income">収入</MenuItem>
          <MenuItem value="expense">支出</MenuItem>
        </Select>
      </FormControl> */}
      <Box
        sx={{
          flexGrow: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {isLoading ? (
          <CircularProgress />
        ) : monthlyTransactions.length > 0 ? (
          <Pie data={data} options={options} />
        ) : (
          <Typography>データがありません</Typography>
        )}
      </Box>
    </>
  );
};

export default CategoryChart;
