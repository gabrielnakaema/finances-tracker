import { mockData } from './mockData';
import { useState, useEffect } from 'react';
import EntryForm from './components/EntryForm';
import EntryList from './components/EntryList';

interface Entry {
  id: number;
  value: number;
  description: string;
}

interface NewEntry {
  value: number;
  description: string;
}

function App() {
  const [data, setData] = useState<Entry[]>();
  const [total, setTotal] = useState(0.0);

  useEffect(() => {
    setData(mockData);
  }, []);

  useEffect(() => {
    if (data) {
      setTotal(data?.reduce((acc, el) => acc + el.value, 0));
    }
  }, [data]);

  function addNewEntry(newEntry: NewEntry) {
    if (data) {
      setData([
        ...data,
        {
          id: data?.length + 1,
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
  }

  return (
    <div
      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
    >
      <h1>Finances Tracker</h1>
      <h2>Total : {total.toFixed(2)}</h2>
      <EntryForm addNewEntry={addNewEntry} />
      <EntryList data={data} />
    </div>
  );
}

export default App;
