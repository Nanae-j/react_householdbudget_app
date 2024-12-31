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
import {
  doc,
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  updateDoc,
} from 'firebase/firestore';
import { db } from './firebase';
import { formatMonth } from './utils/formatting';
import { Schema } from './validations/scheme';

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
  const [isLoading, setIsLoading] = useState(true);

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
      } finally {
        setIsLoading(false);
      }
    };
    fetchTransactions();
  }, []);

  // ひと月分のデータのみ取得
  const monthlyTransactions = transactions.filter((transaction) => {
    return transaction.date.startsWith(formatMonth(currentMonth));
  });

  // 取引を保存する処理
  const handleSaveTransaction = async (transaction: Schema) => {
    try {
      //firestoreにデータを保存
      const docRef = await addDoc(collection(db, 'Transactions'), transaction);
      // console.log('Document written with ID: ', docRef.id);

      // データを送信後、すぐに表示に反映するためにstateで管理
      const newTransaction = {
        id: docRef.id,
        ...transaction,
      } as Transaction;
      setTransactions((prevTransaction) => [
        ...prevTransaction,
        newTransaction,
      ]);
    } catch (error) {
      if (isFireStoreError(error)) {
        console.error(error);
      } else {
        console.error('一般的なエラーは' + error);
      }
    }
  };

  //firestoreのデータ削除処理
  const handleDeleteTransaction = async (
    transactionIds: string | readonly string[],
  ) => {
    // console.log(transactionId);
    try {
      // transactionIdsが単一の要素だった場合、配列で囲む
      const idsToDelete = Array.isArray(transactionIds)
        ? transactionIds
        : [transactionIds];

      for (const id of idsToDelete) {
        await deleteDoc(doc(db, 'Transactions', id));
      }
      //transaction.id !== transactionIdで削除対象のID以外のtransactionが取得できる
      // const filterdTransactions = transactions.filter(
      //   (transaction) => transaction.id !== transactionId,
      // );
      const filterdTransactions = transactions.filter(
        (transaction) => !idsToDelete.includes(transaction.id),
      );
      setTransactions(filterdTransactions);
    } catch (error) {
      if (isFireStoreError(error)) {
        console.error(error);
      } else {
        console.error('一般的なエラーは' + error);
      }
    }
  };

  //更新処理
  const handleUpdateTransaction = async (
    transaction: Schema,
    transactionId: string,
  ) => {
    try {
      const docRef = doc(db, 'Transactions', transactionId);

      // Set the "capital" field of the city 'DC'
      await updateDoc(docRef, transaction);

      // 即時反映するためにstateも変更
      // state(transactions)の中でidが一致したtransaction(t)は中身を更新、falseの時はtransaction(t)をそのまま返す
      const updateTransactions = transactions.map((t) =>
        t.id === transactionId ? { ...t, ...transaction } : t,
      ) as Transaction[];
      setTransactions(updateTransactions);
    } catch (error) {
      if (isFireStoreError(error)) {
        console.error(error);
      } else {
        console.error('一般的なエラーは' + error);
      }
    }
  };

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
                  onSaveTransaction={handleSaveTransaction}
                  onDeleteTransaction={handleDeleteTransaction}
                  onUpdateTransaction={handleUpdateTransaction}
                />
              }
            />
            <Route
              path="/report"
              element={
                <Report
                  currentMonth={currentMonth}
                  setCurrentMonth={setCurrentMonth}
                  monthlyTransactions={monthlyTransactions}
                  isLoading={isLoading}
                  handleDeleteTransaction={handleDeleteTransaction}
                />
              }
            />
            <Route path="*" element={<NoMatch />} />
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
