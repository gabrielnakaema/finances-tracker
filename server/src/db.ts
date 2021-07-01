import mongoose from 'mongoose';

const MONGO_USERNAME = process.env.MONGO_INITDB_ROOT_USERNAME as string;
const MONGO_PASSWORD = process.env.MONGO_INITDB_ROOT_PASSWORD as string;
const DB_HOST = process.env.DB_HOST as string;
const DB_PORT = process.env.DB_PORT as string;
const MONGO_INITDB_DATABASE = process.env.MONGO_INITDB_DATABASE as string;

const mongoURI = DB_PORT
  ? `mongodb://${DB_HOST}/${MONGO_INITDB_DATABASE}:${DB_PORT}`
  : `mongodb+srv://${DB_HOST}/${MONGO_INITDB_DATABASE}`;

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  authSource: 'admin',
  user: MONGO_USERNAME,
  pass: MONGO_PASSWORD,
});

const db = mongoose.connection;

export default db;
