import React, { useEffect, useState } from 'react';
import { theme } from './theme/theme';
import './App.css';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Report from './pages/Report';
import NoMatch from './pages/NoMatch';
import AppLayout from './components/layout/AppLayout';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { Transaction } from './types';
import { collection, getDocs } from 'firebase/firestore';
import { db } from './firebase';
import { formatMonth } from './utils/formatting';

function App() {
  // Firestoreエラーかどうかを判定する型ガード
  function isFireStoreError(
    error: any,
  ): error is { code: string; message: string } {
    return typeof error === 'object' && error !== null && 'code' in error;
  }

  const [transactions, setTransactions] = useState<Transaction[]>([]);
  // new Dateを取得しているのでTSが型を自動的に推論してくれる
  // useState<Date>とする必要なし
  const [currentMonth, setCurrentMonth] = useState(new Date());

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'Transactions'));

        const transactionsData = querySnapshot.docs.map((doc) => {
          // doc.data() is never undefined for query doc snapshots
          // console.log(doc.id, ' => ', doc.data());
          return {
            ...doc.data(),
            id: doc.id,
          } as Transaction;
        });

        // console.log(transactionsData);
        setTransactions(transactionsData);
      } catch (error) {
        if (isFireStoreError(error)) {
          console.error(error);
          // firestoreのエラーだと確定しているので、error.messageやcodeを指定できる
          // console.error(error.message);
          // console.error(error.code);
        } else {
          console.error('一般的なエラーは' + error);
        }
      }
    };
    fetchTransactions();
  }, []);

  const monthlyTransactions = transactions.filter((transaction) => {
    return transaction.date.startsWith(formatMonth(currentMonth));
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/" element={<AppLayout />}>
            <Route
              index
              element={
                <Home
                  monthlyTransactions={monthlyTransactions}
                  setCurrentMonth={setCurrentMonth}
                />
              }
            />
            <Route path="/report" element={<Report />} />
            <Route path="*" element={<NoMatch />} />
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
