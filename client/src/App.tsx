import { mockData } from './mockData';
import { useState, useEffect } from 'react';
import EntryForm from './components/EntryForm';
import EntryList from './components/EntryList';
import format from 'date-fns/format';

interface Entry {
  id: number;
  value: number;
  description: string;
  date: string;
}

interface NewEntry {
  value: number;
  description: string;
}

function App() {
  const [data, setData] = useState<Entry[]>();

  useEffect(() => {
    setData(mockData);
  }, []);

  const addNewEntry = (newEntry: NewEntry) => {
    if (data) {
      setData([
        ...data,
        {
          id: data?.length + 1,
          date: format(new Date(), 'yyyy-MM-dd'),
          ...newEntry,
        },
      ]);
    } else {
      setData([
        {
          id: 1,
          date: format(new Date(), 'yyyy-MM-dd'),
          ...newEntry,
        },
      ]);
    }
  };
  return (
    <div
      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
    >
      <h1>Finances Tracker</h1>
      <EntryForm addNewEntry={addNewEntry} />
      <EntryList data={data} />
    </div>
  );
}

export default App;
