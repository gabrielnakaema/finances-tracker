import parseISO from 'date-fns/parseISO';
import format from 'date-fns/format';
import isSameMonth from 'date-fns/isSameMonth';
import { useState, useEffect } from 'react';
import addMonths from 'date-fns/addMonths';
import CategoryIcon from './CategoryIcon';
import { Entry } from '../types';

interface EntryListProps {
  data: Entry[];
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
    setMonthlyTotal(
      displayData.reduce(
        (acc, el) => (el.type === 'income' ? acc + el.value : acc - el.value),
        0
      )
    );
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
        {format(filterDate, 'MMMM, yyyy')}
        <button onClick={handleIncreaseMonth}>{'>'}</button>
      </div>
      <h2>Total : {monthlyTotal.toFixed(2)}</h2>
      {displayData ? (
        displayData.map((el) => (
          <div key={el._id}>
            <div>
              <CategoryIcon category={el.category} size={'2rem'} />
            </div>
            <div>
              <span>{el.description}</span>
              <div>
                {el.type === 'income' ? (
                  <span>{el.value.toFixed(2).toString()}</span>
                ) : (
                  <span>{el.value.toFixed(2).toString()}</span>
                )}

                <span>{format(parseISO(el.date), 'MMM dd')}</span>
              </div>
            </div>
          </div>
        ))
      ) : (
        <></>
      )}
    </>
  );
};

export default EntryList;
