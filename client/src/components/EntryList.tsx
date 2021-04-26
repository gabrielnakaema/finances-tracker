import parseISO from 'date-fns/parseISO';
import format from 'date-fns/format';
import isSameMonth from 'date-fns/isSameMonth';
import { useState, useEffect } from 'react';
import addMonths from 'date-fns/addMonths';

interface Entry {
  id: number;
  value: number;
  description: string;
  date: string;
}

interface EntryListProps {
  data?: Entry[];
}

const EntryList = (props: EntryListProps) => {
  const [displayData, setDisplayData] = useState<Entry[]>([]);
  const [monthlyTotal, setMonthlyTotal] = useState(0.0);
  const [filterDate, setFilterDate] = useState<Date>(new Date());

  useEffect(() => {
    if (props.data) {
      setDisplayData(
        props.data.filter((el) => isSameMonth(parseISO(el.date), filterDate))
      );
    }
  }, [props.data, filterDate]);

  useEffect(() => {
    setMonthlyTotal(displayData.reduce((acc, el) => acc + el.value, 0));
  }, [displayData, filterDate]);

  const handleDecreaseMonth = () => {
    setFilterDate(addMonths(filterDate, -1));
  };

  const handleIncreaseMonth = () => {
    setFilterDate(addMonths(filterDate, 1));
  };

  return (
    <>
      <h2>Entry List</h2>
      <div>
        <button onClick={handleDecreaseMonth}>{'<'}</button>
        {format(filterDate, 'MMM, yyyy')}
        <button onClick={handleIncreaseMonth}>{'>'}</button>
      </div>
      <h2>Total : {monthlyTotal.toFixed(2)}</h2>
      {displayData ? (
        displayData.map((el) => (
          <div
            style={{
              width: '50%',
              margin: '1rem 0',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: '7rem',
              borderStyle: 'solid',
              borderWidth: '1px',
              textAlign: 'center',
            }}
            key={el.id}
          >
            {el.description}
            <br />
            {el.value.toFixed(2)}
            <br />
            {format(parseISO(el.date), 'MMM dd, yyyy')}
          </div>
        ))
      ) : (
        <></>
      )}
    </>
  );
};

export default EntryList;
