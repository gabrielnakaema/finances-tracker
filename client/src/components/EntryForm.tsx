import React, { useState } from 'react';
import format from 'date-fns/format';
import addMonths from 'date-fns/addMonths';

type Categories =
  | 'stocks'
  | 'health'
  | 'transport'
  | 'mainSalary'
  | 'housing'
  | 'food'
  | 'utilities'
  | 'savings'
  | 'entertainment'
  | 'sideIncome'
  | 'other';

interface NewEntry {
  value: number;
  description: string;
  date: string;
  category: Categories;
}

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

  const handleSubmit = () => {
    const newEntry: NewEntry = {
      value: isExpense ? -1.0 * Number(value) : Number(value),
      description,
      date: format(new Date(), 'yyyy-MM-dd'),
      category,
    };

    if (isRecurring && recurringMonths > 0) {
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
      props.addNewEntry(newEntry);
    }

    setValue('');
    setDescription('');
    setIsExpense(true);
  };

  const handleRecurringCheckboxChange = () => {
    setIsRecurring(!isRecurring);
  };

  return (
    <>
      <h2>Add New Entry</h2>
      <div>
        <input
          type="checkbox"
          checked={isRecurring}
          onChange={handleRecurringCheckboxChange}
        />{' '}
        Recurring
      </div>
      {isRecurring && (
        <div>
          Months to repeat entry:
          <br />
          <input
            type="text"
            value={recurringMonths}
            onChange={(e) => {
              setRecurringMonths(Number(e.target.value));
            }}
          />{' '}
        </div>
      )}
      <div>
        <input
          type="radio"
          value="expense"
          name="expense-type"
          checked={isExpense}
          onChange={() => setIsExpense(true)}
        />{' '}
        Expense
        <input
          type="radio"
          value="income"
          name="expense-type"
          checked={!isExpense}
          onChange={() => setIsExpense(false)}
        />{' '}
        Income
      </div>
      <br />
      Value
      <input
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
        }}
      />
      Description
      <input
        value={description}
        onChange={(e) => {
          setDescription(e.target.value);
        }}
      />
      <label>Category</label>
      {isExpense ? (
        <select value={category} onChange={handleCategoryChange}>
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
      <button onClick={handleSubmit}>Create</button>
    </>
  );
};

export default EntryForm;
