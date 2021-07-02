export type Categories =
  | 'stocks'
  | 'health'
  | 'transport'
  | 'mainSalary'
  | 'housing'
  | 'food'
  | 'utilities'
  | 'savings'
  | 'entertainment'
  | 'sideIncome'
  | 'other';

export type EntryTypes = 'expense' | 'income';

export interface Entry {
  _id: string;
  value: number;
  description: string;
  category: Categories;
  type: EntryTypes;
  date: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface NewEntry {
  value: number;
  description: string;
  category: Categories;
  type: EntryTypes;
  date?: string;
}

export interface NewUser {
  name: string;
  username: string;
  password: string;
}

export interface User {
  name: string;
  username: string;
}

export interface Notification {
  type: 'ok' | 'error';
  statusCode?: number;
  message: string;
}
