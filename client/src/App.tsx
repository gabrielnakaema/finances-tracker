import { mockData } from './mockData';
import { useState, useEffect } from 'react';

interface Entry {
  id: number;
  value: number;
  description: string;
}

function App() {
  const [data, setData] = useState<Entry[]>();

  useEffect(() => {
    setData(mockData);
  }, []);

  return (
    <div
      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
    >
      <h1>Finances Tracker</h1>
      <h2>Add New Entry</h2>
      Value
      <input />
      Description
      <input />
      <h2>Entry List</h2>
      {data ? (
        data.map((el) => (
          <div style={{ width: '50%', textAlign: 'center', margin: '1rem 0' }}>
            {el.description}
            <br />
            {el.value}
          </div>
        ))
      ) : (
        <></>
      )}
    </div>
  );
}

export default App;
