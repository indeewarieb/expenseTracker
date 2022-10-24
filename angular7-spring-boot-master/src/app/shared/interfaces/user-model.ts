export interface User {
    id: number;
    userName: string;
    password: string;
    firstName: string;
    lastName: string;
    token: string;
}

export interface ExpensesInfo {
  numOfEntries: string | number;
  totalAmount: string;
  categoryTotals: string;
  selectedCategory: string;
  umOfEntries?: any;
  firstExpenseDate?: string;
  lastExpenseDate?: string;
}

