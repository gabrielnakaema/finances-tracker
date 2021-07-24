import EntryItem from './EntryItem';
import { Entry } from '../types';

interface EntryListProps {
  data: Entry[];
  handleDelete: (id: string) => void;
}

const EntryList = (props: EntryListProps) => {
  return (
    <div className="flex flex-col items-center min-h-screen">
      <h2 className="text-gray-700 font-bold mt-5">Entries</h2>
      {props.data.map((el) => (
        <EntryItem
          key={el._id}
          entry={el}
          deleteEntry={() => props.handleDelete(el._id)}
        />
      ))}
    </div>
  );
};

export default EntryList;
