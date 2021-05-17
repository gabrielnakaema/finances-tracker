import React, { useState } from 'react';
import format from 'date-fns/format';
import addMonths from 'date-fns/addMonths';
import { NewEntry, Categories } from '../types';

interface EntryFormProps {
  addNewEntry: (newEntry: NewEntry) => void;
  addEntries: (newEntries: NewEntry[]) => void;
}

const EntryForm = (props: EntryFormProps) => {
  const [value, setValue] = useState('');
  const [description, setDescription] = useState('');
  const [isExpense, setIsExpense] = useState(true);
  const [isRecurring, setIsRecurring] = useState(false);
  const [recurringMonths, setRecurringMonths] = useState(0);
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
      setRecurringMonths(0);
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
      value: isExpense ? -1.0 * Number(value) : Number(value),
      description,
      date: format(new Date(), 'yyyy-MM-dd'),
      category,
    };

    if (isRecurring) {
      if (recurringMonths > 0) {
        const arrayOfNewEntries: NewEntry[] = [];
        let i;
        for (i = 0; i < recurringMonths; i++) {
          arrayOfNewEntries.push({
            ...newEntry,
            date: format(addMonths(new Date(), i), 'yyyy-MM-dd'),
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
            <div>
              <label htmlFor="recurring-months-input">
                Months to repeat entry:
              </label>
              <br />
              <input
                id="recurring-months-input"
                type="number"
                min="0"
                value={recurringMonths}
                onChange={(e) => {
                  setRecurringMonths(Number(e.target.value));
                }}
                style={{ margin: 'auto' }}
              />{' '}
            </div>
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
          <label htmlFor="value-input">Value</label>
          <br />
          <input
            id="value-input"
            type="number"
            min="0"
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
            }}
            style={{ margin: 'auto' }}
          />
          <br />
          <label htmlFor="description-input">Description</label>
          <br />
          <input
            id="description-input"
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
            }}
            style={{ margin: 'auto' }}
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
            <select value={category} onChange={handleCategoryChange}>
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
