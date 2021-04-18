import { mockData } from './mockData';
import { useState, useEffect } from 'react';

interface Entry {
  id: number;
  value: number;
  description: string;
}

function App() {
  const [data, setData] = useState<Entry[]>();
  const [newValue, setNewValue] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [total, setTotal] = useState(0.0);

  useEffect(() => {
    setData(mockData);
  }, []);

  useEffect(() => {
    if (data) {
      setTotal(data?.reduce((acc, el) => acc + el.value, 0));
    }
  }, [data]);

  function handleSubmit() {
    if (data) {
      const newEntry = {
        id: data?.length + 1,
        value: Number(newValue),
        description: newDescription,
      };
      setData([...data, newEntry]);
      setNewValue('');
      setNewDescription('');
    } else {
      const newEntry = {
        id: 1,
        value: Number(newValue),
        description: newDescription,
      };
      setData([newEntry]);
      setNewValue('');
      setNewDescription('');
    }
  }

  return (
    <div
      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
    >
      <h1>Finances Tracker</h1>
      <h2>Total : {total.toFixed(2)}</h2>
      <h2>Add New Entry</h2>
      Value
      <input
        value={newValue}
        onChange={(e) => {
          e.preventDefault();
          setNewValue(e.target.value);
        }}
      />
      Description
      <input
        value={newDescription}
        onChange={(e) => {
          e.preventDefault();
          setNewDescription(e.target.value);
        }}
      />
      <button onClick={handleSubmit}>Create</button>
      <h2>Entry List</h2>
      {data ? (
        data.map((el) => (
          <div style={{ width: '50%', textAlign: 'center', margin: '1rem 0' }}>
            {el.description}
            <br />
            {el.value.toFixed(2)}
          </div>
        ))
      ) : (
        <></>
      )}
    </div>
  );
}

export default App;
