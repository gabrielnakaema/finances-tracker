import { Entry, NewEntry } from '../types';
import { api } from './api';

export const fetchAllEntries = async () => {
  const response = await api.get('/entries');
  return response.data;
};

export const addEntry = async (newEntry: NewEntry) => {
  const response = await api.post('/entries', newEntry);
  return response.data as Entry;
};

export const deleteEntry = async (id: string) => {
  const response = await api.delete(`/entries/${id}`);
  return response.status;
};
