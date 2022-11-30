import mongoose from 'mongoose';
const dotenv = require('dotenv').config();

export const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: (): Promise<typeof mongoose> =>
      mongoose.connect(process.env.MONO_DB_CONNECTION_STRING),
  },
];
