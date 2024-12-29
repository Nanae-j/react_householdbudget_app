// 収支データの収入か支出か
export type TransactionType = 'income' | 'expense';

// 収入データのカテゴリ
export type IncomeCategory = '給与' | '副収入' | 'お小遣い';

// 支出データのカテゴリ
export type ExpenseCategory =
  | '食費'
  | '日用品'
  | '住居費'
  | '交際費'
  | '娯楽'
  | '交通費';

// 収支データ
export interface Transaction {
  id: string;
  date: string;
  amount: number;
  content: string;
  type: TransactionType;
  category: IncomeCategory | ExpenseCategory;
}

// 収入・支出・残高
export interface Balance {
  income: number;
  expense: number;
  balance: number;
}

// カレンダーに登録するイベント用の型
export interface CalenderContent {
  start: string;
  // 本来はnumberだけど、一千円単位で,を入れたいのでstringに
  income: string;
  expense: string;
  balance: string;
}
