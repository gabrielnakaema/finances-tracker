import React, { useState } from 'react';
import addMonths from 'date-fns/addMonths';
import { NewEntry, Categories } from '../types';
import TextInput from './TextInput';

interface EntryFormProps {
  addNewEntry: (newEntry: NewEntry) => void;
  addEntries: (newEntries: NewEntry[]) => void;
}

const EntryForm = (props: EntryFormProps) => {
  const [value, setValue] = useState('');
  const [description, setDescription] = useState('');
  const [isExpense, setIsExpense] = useState(true);
  const [recurringMonths, setRecurringMonths] = useState('');
  const [category, setCategory] = useState<Categories>('other');

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const category = e.target.value as Categories;
    setCategory(category);
  };

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();

    function isNumeric(value: string) {
      if (isNaN(Number(value))) {
        return false;
      } else {
        return true;
      }
    }

    function isNull(string: string) {
      if (string.length === 0) {
        return true;
      } else {
        return false;
      }
    }

    function resetFormValues() {
      setValue('');
      setDescription('');
      setRecurringMonths('');
      setCategory('other');
      setIsExpense(true);
    }

    if (!isNumeric(value)) {
      window.alert('New entry value should be numeric');
      resetFormValues();
      return;
    }

    if (isNull(description)) {
      window.alert('New entry description should not be empty');
      resetFormValues();
      return;
    }

    const newEntry: NewEntry = {
      value: Number(value),
      description,
      category,
      type: isExpense ? 'expense' : 'income',
    };

    if (Number(recurringMonths) > 0) {
      const arrayOfNewEntries: NewEntry[] = [];
      let i;
      const todaysDate = new Date();

      for (i = 0; i < Number(recurringMonths); i++) {
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

  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(e.target.value);
  };

  const handleRecurringMonthsChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRecurringMonths(e.target.value);
  };

  return (
    <>
      <h2>Add New Entry</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <TextInput
            value={description}
            onChange={handleDescriptionChange}
            type="text"
            inputId="description-input"
            labelText="Description"
          />
          <TextInput
            value={value}
            onChange={handleValueChange}
            type="number"
            min="0"
            inputId="value-input"
            labelText="Value"
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
            value={recurringMonths}
            onChange={handleRecurringMonthsChange}
            type="number"
            min="0"
            inputId="recurring-months-input"
            labelText="Months to repeat entry:"
          />
          <label className="hidden" htmlFor="create-button">
            Create Entry
          </label>
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
