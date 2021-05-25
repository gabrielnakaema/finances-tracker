import axios from 'axios';
import { Entry, NewEntry } from '../types';

const apiBaseUrl = process.env.REACT_APP_API_URL as string;
const apiPort = process.env.REACT_APP_API_PORT as string;

export const fetchAllEntries = async (token: string) => {
  const response = await axios.get(`http://${apiBaseUrl}:${apiPort}/entries`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const addEntry = async (token: string, newEntry: NewEntry) => {
  const response = await axios.post(
    `http://${apiBaseUrl}:${apiPort}/entries`,
    newEntry,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return response.data as Entry;
};
