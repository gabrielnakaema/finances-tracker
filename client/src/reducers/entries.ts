import { Reducer } from 'react';
import { Entry } from '../types';

export const entriesReducer: EntriesReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_ENTRIES':
      return action.payload;
    case 'ADD_ENTRIES':
      return [...state, ...action.payload];
    case 'REMOVE_ENTRY':
      return state.filter((entry) => entry._id !== action.payload.entryId);
    default:
      return state;
  }
};

type EntriesReducer = Reducer<Entry[], EntriesReducerActions>;

export type EntriesReducerActions =
  | SetEntriesAction
  | AddEntriesAction
  | RemoveEntryAction;

interface SetEntriesAction {
  type: 'SET_ENTRIES';
  payload: Entry[];
}

interface AddEntriesAction {
  type: 'ADD_ENTRIES';
  payload: Entry[];
}

interface RemoveEntryAction {
  type: 'REMOVE_ENTRY';
  payload: { entryId: string };
}
