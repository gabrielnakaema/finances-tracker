type Categories =
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

interface Entry {
  id: number;
  value: number;
  description: string;
  date: string;
  category: Categories;
}

export const mockData: Entry[] = [
  {
    id: 1,
    value: 102.52,
    description: 'quam',
    date: '2021-04-15',
    category: 'stocks',
  },
  {
    id: 2,
    value: -206.24,
    description: 'est et tempus',
    date: '2021-04-16',
    category: 'health',
  },
  {
    id: 3,
    value: -110.22,
    description: 'bibendum imperdiet nullam',
    date: '2021-04-10',
    category: 'transport',
  },
  {
    id: 4,
    value: 269.24,
    description: 'vitae quam suspendisse',
    date: '2021-04-01',
    category: 'mainSalary',
  },
  {
    id: 5,
    value: -442.55,
    description: 'nascetur ridiculus',
    date: '2021-03-15',
    category: 'housing',
  },
  {
    id: 6,
    value: -408.18,
    description: 'a pede posuere nonummy integer',
    date: '2021-04-10',
    category: 'housing',
  },
  {
    id: 7,
    value: 260.19,
    description: 'quis orci nullam molestie nibh',
    date: '2021-03-01',
    category: 'mainSalary',
  },
  {
    id: 8,
    value: -247.49,
    description: 'cras non velit nec',
    date: '2021-04-08',
    category: 'food',
  },
  {
    id: 9,
    value: 378.37,
    description: 'massa id lobortis convallis',
    date: '2021-04-06',
    category: 'sideIncome',
  },
  {
    id: 10,
    value: -51.8,
    description: 'tellus nulla ut erat id',
    date: '2021-04-20',
    category: 'transport',
  },
  {
    id: 11,
    value: -62.95,
    description: 'erat vestibulum sed magna at',
    date: '2021-04-02',
    category: 'entertainment',
  },
  {
    id: 12,
    value: 112.25,
    description: 'nascetur ridiculus mus vivamus vestibulum',
    date: '2021-03-06',
    category: 'stocks',
  },
  {
    id: 13,
    value: -79.3,
    description: 'hac habitasse platea',
    date: '2021-03-15',
    category: 'food',
  },
  {
    id: 14,
    value: 93.34,
    description: 'duis at velit eu',
    date: '2021-04-13',
    category: 'other',
  },
  {
    id: 15,
    value: 20.46,
    description: 'maecenas tristique est et',
    date: '2021-04-19',
    category: 'other',
  },
  {
    id: 16,
    value: 47.77,
    description: 'potenti nullam',
    date: '2021-04-02',
    category: 'stocks',
  },
  {
    id: 17,
    value: 460.19,
    description: 'pede justo eu massa donec',
    date: '2021-03-02',
    category: 'sideIncome',
  },
  {
    id: 18,
    value: -54.41,
    description: 'sed',
    date: '2021-04-08',
    category: 'savings',
  },
  {
    id: 19,
    value: 372.18,
    description: 'auctor',
    date: '2021-03-25',
    category: 'sideIncome',
  },
  {
    id: 20,
    value: 276.3,
    description: 'quis orci',
    date: '2021-04-01',
    category: 'sideIncome',
  },
];
