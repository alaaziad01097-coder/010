import { getDesktopApi } from '@/lib/electronBridge';

export interface ExpenseCategory {
  id: string;
  name: string;
  account_id: string | null;
}

export interface IncomeCategory {
  id: string;
  name: string;
  account_id: string | null;
}

export interface Expense {
  id: string;
  doc_number: string;
  date: string;
  category_name: string | null;
  amount: number;
  activity_id: string | null;
  payment_method: string;
  description: string | null;
  is_shared: boolean;
}

export interface Income {
  id: string;
  doc_number: string;
  date: string;
  category_name: string | null;
  amount: number;
  activity_id: string | null;
  payment_method: string;
  description: string | null;
}

export async function listExpenseCategories(): Promise<ExpenseCategory[]> {
  return (await getDesktopApi().farm.expenses.categories()).expense;
}

export async function listIncomeCategories(): Promise<IncomeCategory[]> {
  return (await getDesktopApi().farm.expenses.categories()).income;
}

export async function listExpenses(): Promise<Expense[]> {
  return (await getDesktopApi().farm.expenses.list()) as Expense[];
}

export async function listIncomes(): Promise<Income[]> {
  return (await getDesktopApi().farm.incomes.list()) as Income[];
}

export async function createExpense(data: {
  date: string;
  categoryId: string;
  amount: number;
  activityId?: string | null;
  paymentMethod?: string;
  description?: string;
  isShared?: boolean;
  createdBy?: string | null;
  cashboxId?: string;
  allocations?: { activityId: string; percentage: number }[];
}): Promise<void> {
  if (data.amount <= 0) throw new Error('المبلغ يجب أن يكون أكبر من صفر');
  await getDesktopApi().farm.expenses.create({ ...data, cashboxId: data.cashboxId ?? 'cash-main', allocations: data.allocations ?? [] });
}

export async function createIncome(data: {
  date: string;
  categoryId: string;
  amount: number;
  activityId?: string | null;
  paymentMethod?: string;
  description?: string;
  createdBy?: string | null;
  cashboxId?: string;
}): Promise<void> {
  if (data.amount <= 0) throw new Error('المبلغ يجب أن يكون أكبر من صفر');
  await getDesktopApi().farm.incomes.create({ ...data, cashboxId: data.cashboxId ?? 'cash-main' });
}
