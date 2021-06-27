import { useState, useMemo } from 'react';
import parseISO from 'date-fns/parseISO';
import format from 'date-fns/format';
import isSameMonth from 'date-fns/isSameMonth';
import addMonths from 'date-fns/addMonths';
import Button from './Button';
import EntryItem from './EntryItem';
import { Entry } from '../types';

interface EntryListProps {
  data: Entry[];
  handleDelete: (id: string) => void;
}

const EntryList = (props: EntryListProps) => {
  const [filterDate, setFilterDate] = useState<Date>(new Date());

  const displayData = useMemo(
    () => props.data.filter((el) => isSameMonth(parseISO(el.date), filterDate)),
    [props.data, filterDate]
  );

  const monthlyTotal = useMemo(
    () =>
      displayData.reduce(
        (acc, el) => (el.type === 'income' ? acc + el.value : acc - el.value),
        0
      ),
    [displayData]
  );

  const handleDecreaseMonth = () => {
    setFilterDate(addMonths(filterDate, -1));
  };

  const handleIncreaseMonth = () => {
    setFilterDate(addMonths(filterDate, 1));
  };

  return (
    <div className="flex flex-col flex-grow items-center text-left border-gray-100 border m-3 md:w-1/2">
      <h2 className="text-gray-700 font-bold m-3 mt-5">Entry List</h2>
      <div className="flex flex-row items-center">
        <Button onClick={handleDecreaseMonth} className="px-5 py-2">
          {'<'}
        </Button>
        <span className="font-semibold px-1 text-gray-700 whitespace-nowrap">
          {format(filterDate, 'MMMM, yyyy')}
        </span>
        <Button onClick={handleIncreaseMonth} className="px-5 py-2">
          {'>'}
        </Button>
      </div>
      <h2 className="text-gray-700 font-bold m-3">
        Total : ${monthlyTotal.toFixed(2)}
      </h2>
      {displayData ? (
        displayData.map((el) => (
          <EntryItem
            id={el._id}
            value={el.value}
            description={el.description}
            category={el.category}
            date={format(parseISO(el.date), 'MMM dd')}
            type={el.type}
            deleteEntry={() => props.handleDelete(el._id)}
          />
        ))
      ) : (
        <></>
      )}
    </div>
  );
};

export default EntryList;
