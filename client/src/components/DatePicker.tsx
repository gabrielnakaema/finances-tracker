import DatePicker from 'react-datepicker';

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
        onChange={props.onChange}
        className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight
  focus:outline-none focus:bg-white focus:border-blue-500"
      />
    </div>
  );
};

export default CustomDatePicker;
