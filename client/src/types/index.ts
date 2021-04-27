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

export interface Entry {
  id: number;
  value: number;
  description: string;
  date: string;
  category: Categories;
}

export interface NewEntry {
  value: number;
  description: string;
  date: string;
  category: Categories;
}
