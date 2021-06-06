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

interface EntryFormProps {
  addNewEntry: (newEntry: NewEntry) => void;
  addEntries: (newEntries: NewEntry[]) => void;
}

const EntryForm = (props: EntryFormProps) => {
  const [isExpense, setIsExpense] = useState(true);
  const [category, setCategory] = useState<Categories>('other');
  const value = useTextField('text', validateEntryValue);
  const description = useTextField('text', validateDescription);
  const recurringMonths = useTextField('number', validateRecurringMonths);

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const category = e.target.value as Categories;
    setCategory(category);
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
    };
    const numberOfRecurringMonths = Number(recurringMonths.value);

    if (numberOfRecurringMonths > 0) {
      const arrayOfNewEntries: NewEntry[] = [];
      let i;
      const todaysDate = new Date();

      for (i = 0; i < numberOfRecurringMonths; i++) {
        arrayOfNewEntries.push({
          ...newEntry,
          date: addMonths(todaysDate, i).toISOString(),
        });
      }
      props.addEntries(arrayOfNewEntries);
    } else {
      props.addNewEntry(newEntry);
    }
    resetFormValues();
  };

  return (
    <>
      <h2 className="block font-bold text-gray-700 m-3">Add New Entry</h2>
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
          <TextInput
            value={recurringMonths.value}
            onChange={recurringMonths.onChange}
            type={recurringMonths.type}
            onBlur={recurringMonths.onBlur}
            inputId="recurring-months-input"
            labelText="Months to repeat entry:"
            error={recurringMonths.error}
          />

          <button
            id="create-button"
            className="bg-blue-500 hover:bg-blue-300 p-3 text-white rounded w-1/2 block mx-auto font-medium"
            type="submit"
          >
            Create
          </button>
        </div>
      </form>
    </>
  );
};

export default EntryForm;
