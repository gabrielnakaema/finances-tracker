import mongoose from '../mongoose';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    maxlength: 50,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  entries: [
    {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'entry',
    },
  ],
});

export const User = mongoose.model('user', userSchema);
