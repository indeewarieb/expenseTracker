export interface Expense {
  id?: string;
  description: string;
  date: Date | string;
  type: string;
  amount: number | string;
  userId: number;
}
