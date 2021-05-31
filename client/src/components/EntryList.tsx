import parseISO from 'date-fns/parseISO';
import format from 'date-fns/format';
import isSameMonth from 'date-fns/isSameMonth';
import { useState, useEffect } from 'react';
import addMonths from 'date-fns/addMonths';
import CategoryIcon from './CategoryIcon';
import { Entry } from '../types';
import { CgTrash } from 'react-icons/cg';

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
    <div className="flex flex-col items-center text-left">
      <h2 className="text-gray-700 font-bold m-3 mt-5">Entry List</h2>
      <div className="w-1/2 flex flex-row justify-between items-center">
        <button
          className="bg-blue-500 hover:bg-blue-300 text-white px-4 py-1 rounded"
          onClick={handleDecreaseMonth}
        >
          {'<'}
        </button>
        <span className="font-semibold  text-gray-700">
          {format(filterDate, 'MMMM, yyyy')}
        </span>
        <button
          className="bg-blue-500 hover:bg-blue-300 text-white px-4 py-1 rounded"
          onClick={handleIncreaseMonth}
        >
          {'>'}
        </button>
      </div>
      <h2 className="text-gray-700 font-bold m-3">
        Total : ${monthlyTotal.toFixed(2)}
      </h2>
      {displayData ? (
        displayData.map((el) => (
          <div
            key={el._id}
            className=" shadow-md m-1 w-3/4 border border-gray-300 rounded"
          >
            <div
              className={`flex flex-row w-full h-full m-0 p-1 border-l-4 ${
                el.type === 'income' ? 'border-green-700' : 'border-red-600'
              } rounded`}
            >
              <div className="flex items-center justify-center m-2">
                <CategoryIcon category={el.category} size={'2rem'} />
              </div>
              <div className="w-full m-2">
                <div className="flex flex-row items-center justify-between py-1">
                  <span className="block py-1 text-gray-900">
                    {el.description}
                  </span>
                  <div className="flex flex-row">
                    <button onClick={() => props.handleDelete(el._id)}>
                      <CgTrash size="1.5rem" className="ml-1 text-gray-700" />
                    </button>
                  </div>
                </div>
                <div className="flex flex-row justify-between py-1">
                  {el.type === 'income' ? (
                    <span className="px-2 bg-green-700 rounded-full text-white">
                      ${el.value.toFixed(2).toString()}
                    </span>
                  ) : (
                    <span className="px-2 bg-red-600 rounded-full text-white">
                      ${el.value.toFixed(2).toString()}
                    </span>
                  )}

                  <span className="text-gray-500">
                    {format(parseISO(el.date), 'MMM dd')}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <></>
      )}
    </div>
  );
};

export default EntryList;
