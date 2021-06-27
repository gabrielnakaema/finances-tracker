import parseISO from 'date-fns/parseISO';
import format from 'date-fns/format';
import isSameMonth from 'date-fns/isSameMonth';
import { useState, useEffect } from 'react';
import addMonths from 'date-fns/addMonths';
import CategoryIcon from './CategoryIcon';
import { Entry, Categories } from '../types';
import { CgTrash } from 'react-icons/cg';
import Button from './Button';

interface EntryListProps {
  data: Entry[];
  handleDelete: (id: string) => void;
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
    <div className="flex flex-col flex-grow items-center text-left border-gray-100 border m-3 md:w-1/2">
      <h2 className="text-gray-700 font-bold m-3 mt-5">Entry List</h2>
      <div className="min-w-1/2 flex flex-row justify-between items-center">
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
            date={el.date}
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

interface EntryItemProps {
  id: string;
  type: string;
  category: Categories;
  description: string;
  value: number;
  date: string;
  deleteEntry: () => void;
}

const EntryItem = (props: EntryItemProps) => {
  return (
    <div
      key={props.id}
      className=" shadow-md m-1 w-4/5 border border-gray-300 rounded overflow-hidden"
    >
      <div
        className={`flex flex-row h-full w-full m-0 p-1 border-l-4 ${
          props.type === 'income' ? 'border-green-700' : 'border-red-600'
        } rounded`}
      >
        <div className="flex items-center justify-center m-2">
          <CategoryIcon category={props.category} size={'2rem'} />
        </div>
        <div className="m-2 flex-1 min-w-0">
          <div className="flex flex-row items-center py-1 ">
            <span className="py-1 text-gray-900 min-w-0 overflow-hidden whitespace-nowrap">
              {props.description}
            </span>
            <div className="ml-auto mr-1">
              <button onClick={props.deleteEntry}>
                <CgTrash size="1.5rem" className="ml-1 text-gray-700" />
              </button>
            </div>
          </div>
          <div className="flex flex-row justify-between py-1">
            {props.type === 'income' ? (
              <span className="px-2 bg-green-700 rounded-full text-white">
                ${props.value.toFixed(2).toString()}
              </span>
            ) : (
              <span className="px-2 bg-red-600 rounded-full text-white">
                ${props.value.toFixed(2).toString()}
              </span>
            )}

            <span className="text-gray-500">
              {format(parseISO(props.date), 'MMM dd')}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EntryList;
