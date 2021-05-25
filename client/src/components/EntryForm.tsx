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
  const [isRecurring, setIsRecurring] = useState(false);
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
      setIsRecurring(false);
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

    if (isRecurring) {
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
        window.alert('Recurring Months should be greater than zero.');
      }
    } else {
      props.addNewEntry(newEntry);
    }
    resetFormValues();
  };

  const handleRecurringCheckboxChange = () => {
    setIsRecurring(!isRecurring);
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
        <div style={{ textAlign: 'center' }}>
          <input
            id="recurring-checkbox"
            type="checkbox"
            checked={isRecurring}
            onChange={handleRecurringCheckboxChange}
            style={{ margin: 'auto' }}
          />{' '}
          <label htmlFor="recurring-checkbox">Recurring</label>
          {isRecurring && (
            <TextInput
              value={recurringMonths}
              onChange={handleRecurringMonthsChange}
              type="number"
              min="0"
              inputId="recurring-months-input"
              inputStyle={{ margin: 'auto' }}
              labelText="Months to repeat entry:"
            />
          )}
          <div>
            <input
              id="expense-radio"
              type="radio"
              value="expense"
              name="expense-type"
              checked={isExpense}
              onChange={() => setIsExpense(true)}
            />{' '}
            <label htmlFor="expense-radio">Expense</label>
            <input
              id="income-radio"
              type="radio"
              value="income"
              name="expense-type"
              checked={!isExpense}
              onChange={() => setIsExpense(false)}
            />{' '}
            <label htmlFor="income-radio">Income</label>
          </div>
          <TextInput
            value={value}
            onChange={handleValueChange}
            type="number"
            min="0"
            inputId="value-input"
            inputStyle={{ margin: 'auto' }}
            labelText="Value"
          />
          <TextInput
            value={description}
            onChange={handleDescriptionChange}
            type="text"
            inputId="description-input"
            inputStyle={{ margin: 'auto' }}
            labelText="Description"
          />
          <br />
          <label htmlFor="category-select">Category</label>
          <br />
          {isExpense ? (
            <select
              id="category-select"
              value={category}
              onChange={handleCategoryChange}
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
            >
              <option value="mainSalary">Salary</option>
              <option value="sideIncome">Side Income</option>
              <option value="stocks">Stocks</option>
              <option value="other">Other</option>
            </select>
          )}
          <br />
          <label htmlFor="create-button" style={{ display: 'none' }}>
            Create Entry
          </label>
          <button id="create-button" type="submit">
            Create
          </button>
        </div>
      </form>
    </>
  );
};

export default EntryForm;
