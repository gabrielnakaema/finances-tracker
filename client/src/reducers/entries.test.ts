import { Entry } from '../types';
import { entriesReducer, EntriesReducerActions } from './entries';

const mockData = [
  {
    _id: '60dd23a689f97a53a249353c',
    description: 'Salary',
    value: 1550,
    type: 'income',
    category: 'mainSalary',
    createdBy: 'a',
    date: new Date(),
    createdAt: '2021-07-01T02:08:38.968Z',
    updatedAt: '2021-07-01T02:08:38.968Z',
  },
  {
    _id: '60dd23a689f97a53a249353f',
    description: 'streaming services',
    value: 100,
    type: 'expense',
    category: 'entertainment',
    createdBy: 'a',
    date: new Date(),
    createdAt: '2021-07-01T02:08:38.968Z',
    updatedAt: '2021-07-01T02:08:38.968Z',
  },
  {
    _id: '60dd23a689f97a53a249353e',
    description: 'electricity',
    value: 88,
    type: 'expense',
    category: 'utilities',
    createdBy: 'a',
    date: new Date(),
    createdAt: '2021-07-01T02:08:38.968Z',
    updatedAt: '2021-07-01T02:08:38.968Z',
  },
  {
    _id: '60dd23a689f97a53a249353a',
    description: 'supermarket',
    value: 214,
    type: 'expense',
    category: 'food',
    createdBy: 'a',
    date: new Date(),
    createdAt: '2021-07-01T02:08:38.968Z',
    updatedAt: '2021-07-01T02:08:38.968Z',
  },
  {
    _id: '60dd23a689f97a53a249353b',
    description: 'investments',
    value: 400,
    type: 'expense',
    category: 'savings',
    createdBy: 'a',
    date: new Date(),
    createdAt: '2021-07-01T02:08:38.968Z',
    updatedAt: '2021-07-01T02:08:38.968Z',
  },
] as Entry[];

test('should return empty array on initialization', () => {
  const state = entriesReducer([], {} as EntriesReducerActions);
  expect(state).toEqual([]);
});

test('should return array with correct number of elements', () => {
  const action: EntriesReducerActions = {
    type: 'SET_ENTRIES',
    payload: mockData,
  };
  const state = entriesReducer([], action);
  expect(state).toHaveLength(mockData.length);
});

test('should add one entry to state', () => {
  const newEntry: Entry = {
    _id: '60dd23a689f97a53a249353b',
    description: 'investments',
    value: 400,
    type: 'expense',
    category: 'savings',
    createdBy: 'a',
    date: new Date(),
    createdAt: '2021-07-01T02:08:38.968Z',
    updatedAt: '2021-07-01T02:08:38.968Z',
  };
  const action: EntriesReducerActions = {
    type: 'ADD_ENTRIES',
    payload: [newEntry],
  };
  const updatedState = entriesReducer(mockData, action);
  expect(updatedState).toHaveLength(mockData.length + 1);
});

test('should add two entries to state', () => {
  const newEntries: Entry[] = [
    {
      _id: '60dd23a689f97a53a249153b',
      description: 'investments',
      value: 400,
      type: 'expense',
      category: 'savings',
      createdBy: 'a',
      date: new Date(),
      createdAt: '2021-07-01T02:08:38.968Z',
      updatedAt: '2021-07-01T02:08:38.968Z',
    },
    {
      _id: '60dd23a689f97a53a249323b',
      description: 'freelancing',
      value: 400,
      type: 'income',
      category: 'sideIncome',
      createdBy: 'a',
      date: new Date(),
      createdAt: '2021-07-01T02:08:38.968Z',
      updatedAt: '2021-07-01T02:08:38.968Z',
    },
  ];
  const action: EntriesReducerActions = {
    type: 'ADD_ENTRIES',
    payload: newEntries,
  };
  const updatedState = entriesReducer(mockData, action);
  expect(updatedState).toHaveLength(mockData.length + newEntries.length);
});

test('should remove one entry', () => {
  const action: EntriesReducerActions = {
    type: 'REMOVE_ENTRY',
    payload: { entryId: mockData[1]._id },
  };
  const updatedState = entriesReducer(mockData, action);
  expect(updatedState).toHaveLength(mockData.length - 1);
});
