import Graphs from './Graphs';
import Button from './Button';
import isSameMonth from 'date-fns/isSameMonth';
import parseISO from 'date-fns/parseISO';
import addMonths from 'date-fns/addMonths';
import format from 'date-fns/format';
import { Entry } from '../types';
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
    <div className="mt-3 md:w-2/3">
      <div className="md:border md:border-gray-100 md:p-2">
        <div className="md:w-1/3 mx-auto mt-3">
          <div className="flex flex-row items-center">
            <Button onClick={handleDecreaseMonth} className="w-1/4 py-2 ml-0">
              {'<'}
            </Button>
            <span className="whitespace-nowrap text-gray-700 font-bold">
              {formattedDate}
            </span>
            <Button
              onClick={handleIncreaseMonth}
              className="w-1/4 py-2 mr-0 ml-auto"
            >
              {'>'}
            </Button>
          </div>
        </div>
        {props.isLoading ? (
          <div className="h-screen">
            <LoadingSpinner className="mx-auto" />
          </div>
        ) : monthlyData.length > 0 ? (
          <div className="flex flex-col-reverse md:flex-row">
            <div className="w-full md:w-1/2">
              <EntryList data={monthlyData} handleDelete={props.deleteEntry} />
            </div>
            <div>
              <Graphs monthlyData={monthlyData} allData={props.data} />
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
