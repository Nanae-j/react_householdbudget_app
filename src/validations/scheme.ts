import { z } from 'zod';

export const transactionScheme = z.object({
  // ここでのtypeはtransactionFormで指定しているnameの名前

  // 'income' | 'expense'と同じ意味になる
  type: z.enum(['income', 'expense']),
  // min(1) - 最低一文字の入力が必要
  date: z.string().min(1, { message: '日付は必須です' }),
  amount: z.number().min(1, { message: '金額は1円以上である必要があります' }),
  content: z
    .string()
    .min(1, { message: '内容を入力してください' })
    .max(50, { message: '内容は50文字以内にしてください' }),
  category: z
    .union([
      z.enum(['食費', '日用品', '住居費', '交際費', '娯楽', '交通費']),
      z.enum(['給与', '副収入', 'お小遣い']),
      z.literal(''),
    ])
    .refine((val) => val !== '', { message: 'カテゴリーを選択してください' }),
});

export type Schema = z.infer<typeof transactionScheme>;
