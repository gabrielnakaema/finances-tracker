import { Entry, NewEntry } from '../types';
import { api } from './api';

export const fetchAllEntries = async () => {
  try {
    const response = await api.get('/entries');
    return response.data as Entry[];
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const postEntry = async (newEntry: NewEntry) => {
  try {
    const response = await api.post('/entries', newEntry);
    return response.data as Entry;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const postEntries = async (newEntries: NewEntry[]) => {
  try {
    const response = await api.post('/entries', newEntries);
    return response.data as Entry[];
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
