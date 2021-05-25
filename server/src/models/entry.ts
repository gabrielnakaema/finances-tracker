import mongoose, { Schema, Document } from 'mongoose';

const entryTypes = ['expense', 'income'] as const;
const categoryTypes = [
  'stocks',
  'health',
  'transport',
  'mainSalary',
  'housing',
  'food',
  'utilities',
  'savings',
  'entertainment',
  'sideIncome',
  'other',
] as const;

type EntryTypes = typeof entryTypes[number];
type Categories = typeof categoryTypes[number];

export interface IEntry extends Document {
  _id: mongoose.Types.ObjectId;
  description: string;
  value: number;
  type: EntryTypes;
  category: Categories;
  createdBy: mongoose.Types.ObjectId;
  date: Date;
  createdAt: Date;
  updatedAt: Date;
}

const entrySchema: Schema = new mongoose.Schema(
  {
    description: {
      type: String,
      required: true,
      maxlength: 50,
    },
    value: {
      type: Number,
      required: true,
    },
    type: {
      type: String,
      enum: entryTypes,
      required: true,
    },
    category: {
      type: String,
      enum: categoryTypes,
      required: true,
    },
    createdBy: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'user',
      required: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

export const Entry = mongoose.model<IEntry>('entry', entrySchema);
