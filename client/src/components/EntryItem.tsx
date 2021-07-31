import { CgTrash } from 'react-icons/cg';
import format from 'date-fns/format';
import parseISO from 'date-fns/parseISO';
import CategoryIcon from './CategoryIcon';
import { Entry } from '../types';

interface EntryItemProps {
  entry: Entry;
  deleteEntry: () => void;
}

const EntryItem = (props: EntryItemProps) => {
  return (
    <div className=" shadow-md w-full border border-gray-300 rounded overflow-hidden mt-4">
      <div
        className={`flex flex-row h-full w-full m-0 p-1 border-l-4 ${
          props.entry.type === 'income' ? 'border-green-700' : 'border-red-600'
        } rounded`}
      >
        <div className="flex items-center justify-center m-2">
          <CategoryIcon category={props.entry.category} size={'2rem'} />
        </div>
        <div className="m-2 flex-1 min-w-0">
          <div className="flex flex-row items-center py-1 ">
            <span className="py-1 text-gray-900 min-w-0 overflow-hidden whitespace-nowrap">
              {props.entry.description}
            </span>
            <div className="ml-auto mr-1">
              <button onClick={props.deleteEntry}>
                <CgTrash size="1.5rem" className="ml-1 text-gray-700" />
              </button>
            </div>
          </div>
          <div className="flex flex-row justify-between py-1">
            {props.entry.type === 'income' ? (
              <span className="px-2 bg-green-700 rounded-full text-white">
                ${props.entry.value.toFixed(2).toString()}
              </span>
            ) : (
              <span className="px-2 bg-red-600 rounded-full text-white">
                ${props.entry.value.toFixed(2).toString()}
              </span>
            )}
            <span className="text-gray-500">
              {format(parseISO(props.entry.date), 'MMM dd')}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EntryItem;
