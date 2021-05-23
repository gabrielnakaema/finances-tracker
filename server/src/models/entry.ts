import mongoose from 'mongoose';

const entrySchema = new mongoose.Schema({
  description: {
    type: String,
    required: true,
    maxlength: 50,
  },
  value: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
  },
  type: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  createdBy: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'user',
    required: true,
  },
});

export const Entry = mongoose.model('entry', entrySchema);
