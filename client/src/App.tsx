import { mockData } from './mockData';
import { useState, useEffect } from 'react';
import EntryForm from './components/EntryForm';
import EntryList from './components/EntryList';

interface Entry {
  id: number;
  value: number;
  description: string;
  date: string;
}

interface NewEntry {
  value: number;
  description: string;
  date: string;
}

function App() {
  const [data, setData] = useState<Entry[]>([]);

  useEffect(() => {
    setData(mockData);
  }, []);

  const addNewEntry = (newEntry: NewEntry) => {
    if (data) {
      setData([
        ...data,
        {
          id: data.length + 1,
          ...newEntry,
        },
      ]);
    } else {
      setData([
        {
          id: 1,
          ...newEntry,
        },
      ]);
    }
  };

  const addEntries = (newEntries: NewEntry[]) => {
    setData([
      ...data,
      ...newEntries.map((el, index) => ({
        ...el,
        id: data.length + 1 + index,
      })),
    ]);
  };

  return (
    <div
      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
    >
      <h1>Finances Tracker</h1>
      <EntryForm addNewEntry={addNewEntry} addEntries={addEntries} />
      <EntryList data={data} />
    </div>
  );
}

export default App;
