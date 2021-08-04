import parseISO from 'date-fns/parseISO';
import { Entry, NewEntry } from '../types';
import { api } from './api';

interface APIEntry {
  _id: string;
  value: number;
  description: string;
  category: string;
  type: string;
  date: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

export const fetchAllEntries = async () => {
  try {
    const response = await api.get('/entries');
    const data = response.data as APIEntry[];
    const entries = data.map((entry) => ({
      ...entry,
      date: parseISO(entry.date),
    })) as Entry[];
    return entries;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const postEntry = async (newEntry: NewEntry) => {
  try {
    const response = await api.post('/entries', newEntry);
    const data = response.data as APIEntry;
    const entry = { ...data, date: parseISO(data.date) } as Entry;
    return entry;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const postEntries = async (newEntries: NewEntry[]) => {
  try {
    const response = await api.post('/entries', newEntries);
    const data = response.data as APIEntry[];
    const entries = data.map((entry) => ({
      ...entry,
      date: parseISO(entry.date),
    })) as Entry[];
    return entries;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const deleteEntry = async (id: string) => {
  try {
    await api.delete(`/entries/${id}`);
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};
