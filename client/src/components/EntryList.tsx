import parseISO from 'date-fns/parseISO';
import format from 'date-fns/format';
import EntryItem from './EntryItem';
import { Entry } from '../types';
import LoadingSpinner from './LoadingSpinner';

interface EntryListProps {
  data: Entry[];
  handleDelete: (id: string) => void;
  isLoading: boolean;
}

const EntryList = (props: EntryListProps) => {
  return (
    <div className="flex flex-col items-center min-h-screen">
      <h2 className="text-gray-700 font-bold mt-5">Entries</h2>
      {props.isLoading ? (
        <LoadingSpinner />
      ) : props.data.length > 0 ? (
        props.data.map((el) => (
          <EntryItem
            key={el._id}
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
        <p className="text-gray-500">No entries for this month</p>
      )}
    </div>
  );
};

export default EntryList;
