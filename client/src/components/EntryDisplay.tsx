import Graphs from './Graphs';
import Button from './Button';
import isSameMonth from 'date-fns/isSameMonth';
import parseISO from 'date-fns/parseISO';
import addMonths from 'date-fns/addMonths';
import format from 'date-fns/format';
import { Entry, EntryTypes } from '../types';
import { useState } from 'react';
import EntryList from './EntryList';
import LoadingSpinner from './LoadingSpinner';

interface EntryDisplayProps {
  data: Entry[];
  deleteEntry: (id: string) => void;
  isLoading: boolean;
}

const EntryDisplay = (props: EntryDisplayProps) => {
  const [filterDate, setFilterDate] = useState(new Date());
  const [filterType, setFilterType] = useState<EntryTypes>('expense');
  const monthlyData = props.data.filter((entry) =>
    isSameMonth(filterDate, parseISO(entry.date))
  );
  const formattedDate: string = format(filterDate, 'MMMM, yyyy');

  const handleDecreaseMonth = () => {
    setFilterDate(addMonths(filterDate, -1));
  };

  const handleIncreaseMonth = () => {
    setFilterDate(addMonths(filterDate, 1));
  };

  return (
    <div className=" m-3 md:w-2/3 ">
      <div className="border border-gray-100 md:p-2">
        <div id="filters" className=" text-center">
          <div className="flex flex-row items-center md:w-1/3 mx-auto mt-3">
            <Button onClick={handleDecreaseMonth} className=" py-2">
              {'<'}
            </Button>
            <span className="whitespace-nowrap text-gray-700 font-bold">
              {formattedDate}
            </span>
            <Button onClick={handleIncreaseMonth} className=" py-2">
              {'>'}
            </Button>
          </div>
        </div>
        {monthlyData.length > 0 ? (
          <div className="flex flex-col-reverse md:flex-row">
            <div className="w-full md:w-1/2">
              <EntryList
                data={monthlyData}
                handleDelete={props.deleteEntry}
                isLoading={props.isLoading}
              />
            </div>
            <div className="w-full md:w-1/2 flex flex-col items-center">
              <div id="graph-filters" className="mt-5 text-center">
                <h2 className="text-gray-700 font-bold">Graph Filters</h2>
                <div>
                  <input
                    id="graph-filter-expense-radio"
                    type="radio"
                    value="expense"
                    name="graph-filter-expense-type"
                    checked={filterType === 'expense'}
                    onChange={() => setFilterType('expense')}
                  />{' '}
                  <label
                    className=" text-gray-700"
                    htmlFor="graph-filter-expense-radio"
                  >
                    Expense
                  </label>
                  <input
                    id="graph-filter-income-radio"
                    type="radio"
                    value="income"
                    name="graph-filter-expense-type"
                    className="ml-3"
                    checked={filterType === 'income'}
                    onChange={() => setFilterType('income')}
                  />{' '}
                  <label
                    className=" text-gray-700"
                    htmlFor="graph-filter-income-radio"
                  >
                    Income
                  </label>
                </div>
              </div>

              {props.isLoading ? (
                <LoadingSpinner />
              ) : (
                <div className="md:border border-gray-100 md:m-3">
                  <Graphs data={monthlyData} filterType={filterType} />
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="h-screen text-center mt-5">
            <p className="text-gray-500">No entries for this month</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default EntryDisplay;