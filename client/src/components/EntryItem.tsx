import { CgTrash } from 'react-icons/cg';
import CategoryIcon from './CategoryIcon';
import { Categories } from '../types';

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
            <span className="text-gray-500">{props.date}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EntryItem;