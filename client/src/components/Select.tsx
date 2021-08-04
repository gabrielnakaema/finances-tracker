interface SelectProps {
  value: string;
  options: {
    value: string;
    label: string;
  }[];
  onChange: (text: string) => void;
  id: string;
  className?: string;
}

const Select = (props: SelectProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    props.onChange(e.target.value);
  };

  return (
    <div className="inline-block relative w-full">
      <select
        id={props.id}
        className="bg-gray-200 border-2  appearance-none border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight
                focus:outline-none focus:bg-white focus:border-blue-500"
        onChange={handleChange}
        value={props.value}
      >
        {props.options.map((option) => (
          <option
            key={`${props.id}-option-${option.value}`}
            value={option.value}
          >
            {option.label}
          </option>
        ))}
      </select>
      <div className="pointer-events-none absolute right-0 flex items-center px-2 text-gray-700 inset-y-0">
        <svg
          className="fill-current h-4 w-4"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
        </svg>
      </div>
    </div>
  );
};

export default Select;
