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
