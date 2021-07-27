import React, { useState } from 'react';
import addMonths from 'date-fns/addMonths';
import { NewEntry, Categories } from '../types';
import TextInput from './TextInput';
import { useTextField } from '../hooks/useTextField';
import {
  validateEntryValue,
  validateDescription,
  validateRecurringMonths,
} from '../utils/validation';
import DatePicker from './DatePicker';
import 'react-datepicker/dist/react-datepicker.css';
import Button from './Button';

interface EntryFormProps {
  addEntries: (newEntries: NewEntry[]) => void;
}

const EntryForm = (props: EntryFormProps) => {
  const [isExpense, setIsExpense] = useState(true);
  const [category, setCategory] = useState<Categories>('other');
  const value = useTextField('text', validateEntryValue);
  const description = useTextField('text', validateDescription);
  const recurringMonths = useTextField('number', validateRecurringMonths, '0');
  const [date, setDate] = useState(new Date());

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const category = e.target.value as Categories;
    setCategory(category);
  };

  const handleDateChange = (date: Date) => {
    setDate(date);
  };

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();

    const isValueOk = !value.error && value.callValidation();
    const isDescriptionOk = !description.error && description.callValidation();
    const isRecurringMonthsOk =
      !recurringMonths.error && recurringMonths.callValidation();
    if (!isValueOk || !isDescriptionOk || !isRecurringMonthsOk) {
      return;
    }

    function resetFormValues() {
      value.reset();
      description.reset();
      recurringMonths.reset();
      setCategory('other');
      setIsExpense(true);
    }
    const newEntry: NewEntry = {
      value: Number(value.value),
      description: description.value,
      category,
      type: isExpense ? 'expense' : 'income',
      date: date.toISOString(),
    };
    const numberOfRecurringMonths = Number(recurringMonths.value);

    if (numberOfRecurringMonths > 0) {
      const arrayOfNewEntries: NewEntry[] = [];
      let i;
      for (i = 0; i < numberOfRecurringMonths; i++) {
        arrayOfNewEntries.push({
          ...newEntry,
          date: addMonths(date, i).toISOString(),
        });
      }
      props.addEntries(arrayOfNewEntries);
    } else {
      props.addEntries([newEntry]);
    }
    resetFormValues();
  };

  return (
    <div className="md:w-1/3">
      <div className="border-gray-100 border m-3 p-3 pt-5">
        <h2 className="block font-bold text-gray-700 mx-3">Add New Entry</h2>
        <form className="text-left" onSubmit={handleSubmit}>
          <div>
            <TextInput
              value={description.value}
              onChange={description.onChange}
              onBlur={description.onBlur}
              type={description.type}
              inputId="description-input"
              labelText="Description"
              error={description.error}
            />
            <TextInput
              value={value.value}
              onChange={value.onChange}
              type={value.type}
              onBlur={value.onBlur}
              inputId="value-input"
              labelText="Value"
              error={value.error}
            />
            <div className="mx-3 mb-3">
              <p className="block text-gray-700 font-bold mb-2">Entry type</p>
              <input
                id="expense-radio"
                type="radio"
                value="expense"
                name="expense-type"
                checked={isExpense}
                onChange={() => setIsExpense(true)}
              />{' '}
              <label className=" text-gray-700" htmlFor="expense-radio">
                Expense
              </label>
              <input
                id="income-radio"
                type="radio"
                value="income"
                name="expense-type"
                className="ml-3"
                checked={!isExpense}
                onChange={() => setIsExpense(false)}
              />{' '}
              <label className=" text-gray-700" htmlFor="income-radio">
                Income
              </label>
            </div>
            <div className="mx-3">
              <label
                className="block text-gray-700 font-bold mb-2"
                htmlFor="category-select"
              >
                Category
              </label>
              <div className="inline-block relative w-full">
                {isExpense ? (
                  <select
                    id="category-select"
                    value={category}
                    onChange={handleCategoryChange}
                    className="bg-gray-200 border-2  appearance-none border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight
                focus:outline-none focus:bg-white focus:border-blue-500"
                  >
                    <option value="entertainment">Entertainment</option>
                    <option value="food">Food</option>
                    <option value="health">Health</option>
                    <option value="housing">Housing</option>
                    <option value="savings">Savings</option>
                    <option value="transport">Transport</option>
                    <option value="utilities">Utilities</option>
                    <option value="other">Other</option>
                  </select>
                ) : (
                  <select
                    id="category-select"
                    value={category}
                    onChange={handleCategoryChange}
                    className="bg-gray-200 border-2  appearance-none border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight
                  focus:outline-none focus:bg-white focus:border-blue-500"
                  >
                    <option value="mainSalary">Salary</option>
                    <option value="sideIncome">Side Income</option>
                    <option value="stocks">Stocks</option>
                    <option value="other">Other</option>
                  </select>
                )}
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
            </div>
            <DatePicker date={date} onChange={handleDateChange} />
            <div className="my-4 mx-3 text-center">
              <span className="font-bold text-gray-700">Repeat for</span>

              <input
                type={recurringMonths.type}
                className={`w-14 mx-1 bg-gray-200 appearance-none border-2 border-gray-200 rounded py-2 px-4 text-gray-700 leading-tight
                focus:outline-none focus:bg-white sm:w-20 ${
                  recurringMonths.error
                    ? 'border-red-500 focus:border-red-500'
                    : 'focus:border-blue-500'
                }`}
                value={recurringMonths.value}
                onChange={recurringMonths.onChange}
                max="100"
              />
              <span className="font-bold text-gray-700">months.</span>
            </div>
            <Button type="submit">Submit</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EntryForm;
