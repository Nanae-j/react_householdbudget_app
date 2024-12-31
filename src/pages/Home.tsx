import { Box, useMediaQuery, useTheme } from '@mui/material';
import React, { useState } from 'react';
import MonthlySummary from '../components/MonthlySummary';
import Calendar from '../components/Calendar';
import TransactionForm from '../components/TransactionForm';
import TransactionMenu from '../components/TransactionMenu';
import { Transaction } from '../types';
import { format } from 'date-fns';
import { Schema } from '../validations/scheme';
import { DateClickArg } from '@fullcalendar/interaction';

interface HomeProps {
  monthlyTransactions: Transaction[];
  setCurrentMonth: React.Dispatch<React.SetStateAction<Date>>;
  onSaveTransaction: (transaction: Schema) => Promise<void>;
  onDeleteTransaction: (
    transactionId: string | readonly string[],
  ) => Promise<void>;
  onUpdateTransaction: (
    transaction: Schema,
    transactionId: string,
  ) => Promise<void>;
}

const Home = ({
  monthlyTransactions,
  setCurrentMonth,
  onSaveTransaction,
  onDeleteTransaction,
  onUpdateTransaction,
}: HomeProps) => {
  const today = format(new Date(), 'yyyy-MM-dd');
  const [currentDay, setCurrentDay] = useState(today);
  const [isEntryDrawerOpen, setIsEntryDrawerOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] =
    useState<Transaction | null>(null);
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const theme = useTheme();

  // 1200px以下の時にtrue,1200px以上の時にfalse
  const isMobile = useMediaQuery(theme.breakpoints.down('lg'));

  // １日分のデータを取得
  const dailyTransactions = monthlyTransactions.filter((transaction) => {
    return transaction.date === currentDay;
  });

  // console.log(dailyTransactions);

  // フォームを閉じる処理(❌ボタンを押した時)
  const closeForm = () => {
    setSelectedTransaction(null);

    if (isMobile) {
      setIsDialogOpen(!isDialogOpen);
    } else {
      setIsEntryDrawerOpen(!isEntryDrawerOpen);
    }
  };

  // フォームの開閉処理(内訳追加ボタンを押した時)
  const handleAddTransactionForm = () => {
    if (isMobile) {
      setIsDialogOpen(true);
    } else {
      if (selectedTransaction) {
        setSelectedTransaction(null);
      } else {
        setIsEntryDrawerOpen(!isEntryDrawerOpen);
      }
    }
  };

  // １日の取引履歴のカードが選択された時の処理
  const handleSelectTransaction = (transaction: Transaction) => {
    setSelectedTransaction(transaction);
    if (isMobile) {
      setIsDialogOpen(true);
    } else {
      setIsEntryDrawerOpen(true);
    }
  };

  // 日付を選択した時の処理
  const handleDateClick = (dateInfo: DateClickArg) => {
    setCurrentDay(dateInfo.dateStr);
    setIsMobileDrawerOpen(true);
  };

  // モバイル用のドロワーを閉じる処理
  const handleCloseMobileDrawer = () => {
    setIsMobileDrawerOpen(false);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      {/* 左側コンテンツ */}
      <Box
        sx={{
          flexGrow: 1,
          position: 'relative',
          ...(!isMobile && {
            pointerEvents: isEntryDrawerOpen ? 'none' : 'auto',
          }),
        }}
      >
        <Box
          sx={{
            width: '100%',
            height: '100%',
            backgroundColor: 'gray',
            position: 'absolute',
            top: 0,
            left: 0,
            zIndex: 2,
            visibility: isEntryDrawerOpen && !isMobile ? 'visible' : 'hidden',
            opacity: isEntryDrawerOpen && !isMobile ? '0.5' : '0',
            transition: (theme) =>
              theme.transitions.create('opacity', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
              }),
          }}
        />
        <MonthlySummary monthlyTransactions={monthlyTransactions} />
        <Calendar
          monthlyTransactions={monthlyTransactions}
          setCurrentMonth={setCurrentMonth}
          currentDay={currentDay}
          setCurrentDay={setCurrentDay}
          today={today}
          onDateClick={handleDateClick}
        />
      </Box>
      {/* 右側コンテンツ */}
      <Box>
        <TransactionMenu
          dailyTransactions={dailyTransactions}
          currentDay={currentDay}
          onAddTransactionForm={handleAddTransactionForm}
          onSelectTransaction={handleSelectTransaction}
          isMobile={isMobile}
          open={isMobileDrawerOpen}
          onClose={handleCloseMobileDrawer}
        />
        <TransactionForm
          onCloseForm={closeForm}
          isEntryDrawerOpen={isEntryDrawerOpen}
          currentDay={currentDay}
          onSaveTransaction={onSaveTransaction}
          selectedTransaction={selectedTransaction}
          setSelectedTransaction={setSelectedTransaction}
          onDeleteTransaction={onDeleteTransaction}
          onUpdateTransaction={onUpdateTransaction}
          isMobile={isMobile}
          isDialogOpen={isDialogOpen}
          setIsDialogOpen={setIsDialogOpen}
        />
      </Box>
    </Box>
  );
};

export default Home;
