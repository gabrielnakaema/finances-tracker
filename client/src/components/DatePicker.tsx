import DatePicker from 'react-datepicker';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';
import format from 'date-fns/format';
import 'react-datepicker/dist/react-datepicker.css';

interface CustomDatePickerProps {
  date: Date;
  onChange: (date: Date) => void;
}

const CustomDatePicker = (props: CustomDatePickerProps) => {
  return (
    <div className="m-3">
      <label
        htmlFor="date-picker-input"
        className="block text-gray-700 font-bold mb-2"
      >
        Date
        <span className="font-light"> (mm/dd/yyyy)</span>
      </label>
      <DatePicker
        id="date-picker-input"
        selected={props.date}
        popperPlacement="top"
        showMonthDropdown
        showYearDropdown
        onChange={props.onChange}
        className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight
  focus:outline-none focus:bg-white focus:border-blue-500"
        renderCustomHeader={({
          date,
          decreaseMonth,
          increaseMonth,
          prevMonthButtonDisabled,
          nextMonthButtonDisabled,
        }) => (
          <div className="flex flex-row items-center ">
            <button
              onClick={decreaseMonth}
              type="button"
              className="mr-auto px-3 text-lg font-bold text-gray-400 hover:text-gray-700"
              disabled={prevMonthButtonDisabled}
            >
              <MdChevronLeft size="2rem" />
            </button>
            <span className="text-gray-700 font-bold text-sm">
              {format(date, 'MMMM yyyy')}
            </span>
            <button
              onClick={increaseMonth}
              type="button"
              className="ml-auto px-3 text-lg font-bold text-gray-400 hover:text-gray-700"
              disabled={nextMonthButtonDisabled}
            >
              <MdChevronRight size="2rem" />
            </button>
          </div>
        )}
      />
    </div>
  );
};

export default CustomDatePicker;
