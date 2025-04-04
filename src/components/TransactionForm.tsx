import {
  Box,
  Button,
  ButtonGroup,
  Dialog,
  DialogContent,
  FormControl,
  FormHelperText,
  IconButton,
  InputLabel,
  ListItemIcon,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import React, { JSX, useEffect, useState } from 'react';
import CloseIcon from '@mui/icons-material/Close'; // 閉じるボタン用のアイコン
import FastfoodIcon from '@mui/icons-material/Fastfood'; //食事アイコン
import AlarmIcon from '@mui/icons-material/Alarm';
import AddHomeIcon from '@mui/icons-material/AddHome';
import Diversity3Icon from '@mui/icons-material/Diversity3';
import SportsTennisIcon from '@mui/icons-material/SportsTennis';
import TrainIcon from '@mui/icons-material/Train';
import WorkIcon from '@mui/icons-material/Work';
import SavingsIcon from '@mui/icons-material/Savings';
import AddBusinessIcon from '@mui/icons-material/AddBusiness';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { ExpenseCategory, IncomeCategory, Transaction } from '../types';
import { zodResolver } from '@hookform/resolvers/zod';
import { Schema, transactionScheme } from '../validations/scheme';

interface TransactionFormProps {
  onCloseForm: () => void;
  isEntryDrawerOpen: boolean;
  currentDay: string;
  onSaveTransaction: (transaction: Schema) => Promise<void>;
  selectedTransaction: Transaction | null;
  onDeleteTransaction: (
    transactionId: string | readonly string[],
  ) => Promise<void>;
  setSelectedTransaction: React.Dispatch<React.SetStateAction<Transaction>>;
  onUpdateTransaction: (
    transaction: Schema,
    transactionId: string,
  ) => Promise<void>;
  isMobile: boolean;
  isDialogOpen: boolean;
  setIsDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

type IncomeExpense = 'income' | 'expense';

interface CategoryItem {
  label: IncomeCategory | ExpenseCategory;
  icon: JSX.Element;
}

const TransactionForm = ({
  onCloseForm,
  isEntryDrawerOpen,
  currentDay,
  onSaveTransaction,
  selectedTransaction,
  setSelectedTransaction,
  onDeleteTransaction,
  onUpdateTransaction,
  isMobile,
  isDialogOpen,
  setIsDialogOpen,
}: TransactionFormProps) => {
  const formWidth = 320;

  // 支出用カテゴリ
  const expenseCategories: CategoryItem[] = [
    { label: '食費', icon: <FastfoodIcon fontSize="small" /> },
    { label: '日用品', icon: <AlarmIcon fontSize="small" /> },
    { label: '住居費', icon: <AddHomeIcon fontSize="small" /> },
    { label: '交際費', icon: <Diversity3Icon fontSize="small" /> },
    { label: '娯楽', icon: <SportsTennisIcon fontSize="small" /> },
    { label: '交通費', icon: <TrainIcon fontSize="small" /> },
  ];

  // 収入用カテゴリ
  const incomeCategories: CategoryItem[] = [
    { label: '給与', icon: <WorkIcon fontSize="small" /> },
    { label: '副収入', icon: <AddBusinessIcon fontSize="small" /> },
    { label: 'お小遣い', icon: <SavingsIcon fontSize="small" /> },
  ];

  const [categories, setCategories] = useState(expenseCategories);

  // フォームの各要素の初期値の設定
  const {
    control,
    setValue,
    watch,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<Schema>({
    defaultValues: {
      type: 'expense',
      date: currentDay,
      amount: 0,
      category: '' as Schema['category'],
      content: '',
    },
    resolver: zodResolver(transactionScheme),
  });

  // 収支タイプを切り替える関数
  const incomeExpenseToggle = (type: IncomeExpense) => {
    setValue('type', type);
    // 収支のボタンを切り替えた時に選択したカテゴリーが残ったままになり警告出る
    // カテゴリーのstateを更新する前にカテゴリーの選択を空に
    setValue('category', '' as Schema['category']);
  };

  // 収支タイプを監視
  const currentType = watch('type');

  // 収支タイプに応じたカテゴリを取得
  useEffect(() => {
    const newCategories =
      currentType === 'expense' ? expenseCategories : incomeCategories;
    setCategories(newCategories);
  }, [currentType]);

  useEffect(() => {
    //選択肢が更新されたか確認
    if (selectedTransaction) {
      // some関数は中の式が正しければtrueを返す
      // カテゴリーの文字列が一致した = 更新された と判定する
      const categoryExists = categories.some(
        (category) => category.label === selectedTransaction.category,
      );
      setValue(
        'category',
        categoryExists
          ? selectedTransaction.category
          : ('' as Transaction['category']),
      );
    }
  }, [selectedTransaction, categories]);

  // フォーム内容を更新
  useEffect(() => {
    setValue('date', currentDay);
  }, [currentDay]);

  // 送信処理
  const onSubmit: SubmitHandler<Schema> = (data) => {
    // 取引が選択されている = 更新処理
    if (selectedTransaction) {
      onUpdateTransaction(data, selectedTransaction.id)
        .then(() => {
          // .thenで上記の処理が完了した後に下記の処理が進む
          setSelectedTransaction(null);
          if (isMobile) {
            setIsDialogOpen(false);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      // 取引が選択されていない = 新規追加
      onSaveTransaction(data)
        .then(() => {
          // console.log('新規追加しました');
        })
        .catch((error) => {
          console.error(error);
        });
    }

    // デフォルトの値でリセットされる
    //ここでdateにcurrentDayを入れることで選択している日付を保持できる
    // defaultValuesは最初に入れた値を保持するのでdateには最初の日付(今日)が入り続ける
    reset({
      type: 'expense',
      date: currentDay,
      amount: 0,
      category: '' as Schema['category'],
      content: '',
    });
  };

  useEffect(() => {
    if (selectedTransaction) {
      setValue('type', selectedTransaction.type);
      setValue('date', selectedTransaction.date);
      // setValue('category', selectedTransaction.category);
      setValue('amount', selectedTransaction.amount);
      setValue('content', selectedTransaction.content);
    } else {
      reset({
        type: 'expense',
        date: currentDay,
        amount: 0,
        category: '' as Schema['category'],
        content: '',
      });
    }
  }, [selectedTransaction]);

  // 削除処理
  const handleDelete = () => {
    if (selectedTransaction) {
      onDeleteTransaction(selectedTransaction.id);
      setSelectedTransaction(null);
      if (isMobile) {
        setIsDialogOpen(false);
      }
    }
  };

  const formContent = (
    <>
      <Box display={'flex'} justifyContent={'space-between'} mb={2}>
        <Typography variant="h6">入力</Typography>
        {/* 閉じるボタン */}
        <IconButton
          onClick={onCloseForm}
          sx={{
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      </Box>
      {/* フォーム要素 */}
      <Box component={'form'} onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2}>
          {/* 収支切り替えボタン */}
          {/* rect-hook-formとMUIを統合するのに必要 */}
          <Controller
            name="type"
            control={control}
            render={({ field }) => (
              <ButtonGroup fullWidth>
                <Button
                  variant={field.value === 'expense' ? 'contained' : 'outlined'}
                  color="error"
                  onClick={() => incomeExpenseToggle('expense')}
                >
                  支出
                </Button>
                <Button
                  variant={field.value === 'income' ? 'contained' : 'outlined'}
                  color="primary"
                  onClick={() => incomeExpenseToggle('income')}
                >
                  収入
                </Button>
              </ButtonGroup>
            )}
          />

          {/* 日付 */}
          <Controller
            name="date"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="日付"
                type="date"
                slotProps={{
                  inputLabel: { shrink: true },
                }}
                // errors.dateだけだと内容が取れてしまうのでboolean値で取りたい
                // !errors.dateとすることで反転した真偽値で取れるけどfalseになってしまうのでもう一つ!追加して反転trueに
                error={!!errors.date}
                // ? - オプショナルチェーニング
                // errors.dateがある時のみ.messageにもアクセスする
                helperText={errors.date?.message}
              />
            )}
          />

          {/* カテゴリ */}
          <Controller
            name="category"
            control={control}
            render={({ field }) => (
              <TextField
                error={!!errors.category}
                helperText={errors.category?.message}
                {...field}
                id="カテゴリ"
                label="カテゴリ"
                select
                slotProps={{
                  inputLabel: {
                    htmlFor: 'category',
                  },
                  input: {
                    id: 'category',
                  },
                }}
                // InputLabelProps={{
                //   htmlFor: 'category',
                // }}
                // inputProps={{ id: 'category' }}
              >
                {categories.map((category) => (
                  <MenuItem key={category.label} value={category.label}>
                    <ListItemIcon>{category.icon}</ListItemIcon>
                    {category.label}
                  </MenuItem>
                ))}
              </TextField>

              // <FormControl fullWidth error={!!errors.category}>
              //   <InputLabel id="category-select-label">カテゴリ</InputLabel>
              //   <Select
              //     {...field}
              //     labelId="category-select-label"
              //     id="category-select"
              //     label="カテゴリ"
              //   >
              //     {categories.map((category) => (
              //       <MenuItem key={category.label} value={category.label}>
              //         <ListItemIcon>{category.icon}</ListItemIcon>
              //         {category.label}
              //       </MenuItem>
              //     ))}
              //   </Select>
              //   <FormHelperText>{errors.category?.message}</FormHelperText>
              // </FormControl>
            )}
          />

          {/* 金額 */}
          <Controller
            name="amount"
            control={control}
            render={({ field }) => {
              return (
                <TextField
                  error={!!errors.amount}
                  helperText={errors.amount?.message}
                  {...field}
                  value={field.value === 0 ? '' : field.value}
                  onChange={(e) => {
                    const newValue = parseInt(e.target.value, 10) || 0;
                    field.onChange(newValue);
                  }}
                  label="金額"
                  type="number"
                />
              );
            }}
          />

          {/* 内容 */}
          <Controller
            name="content"
            control={control}
            render={({ field }) => (
              <TextField
                error={!!errors.content}
                helperText={errors.content?.message}
                {...field}
                label="内容"
                type="text"
              />
            )}
          />

          {/* 保存ボタン */}
          <Button
            type="submit"
            variant="contained"
            color={currentType === 'income' ? 'primary' : 'error'}
            fullWidth
          >
            {selectedTransaction ? '更新' : '保存'}
          </Button>

          {selectedTransaction && (
            <Button
              variant="outlined"
              color={'secondary'}
              fullWidth
              onClick={handleDelete}
            >
              削除
            </Button>
          )}
        </Stack>
      </Box>
    </>
  );

  return (
    <>
      {isMobile ? (
        <Dialog
          open={isDialogOpen}
          onClose={onCloseForm}
          fullWidth
          maxWidth={'sm'}
        >
          <DialogContent>{formContent}</DialogContent>
        </Dialog>
      ) : (
        <Box
          sx={{
            position: 'fixed',
            top: 64,
            right: isEntryDrawerOpen ? formWidth : '-2%', // フォームの位置を調整
            width: formWidth,
            height: '100%',
            bgcolor: 'background.paper',
            zIndex: (theme) => theme.zIndex.drawer - 1,
            transition: (theme) =>
              theme.transitions.create('right', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
              }),
            p: 2, // 内部の余白
            boxSizing: 'border-box', // ボーダーとパディングをwidthに含める
            boxShadow: '0px 0px 15px -5px #777777',
          }}
        >
          {formContent}
        </Box>
      )}
    </>
  );
};
export default TransactionForm;
