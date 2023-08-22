import { DB_URL } from '@config';
import { ConnectOptions } from 'mongoose';

type dbConnectionType = {
  url: string;
  options: {
    useNewUrlParser: boolean;
    useUnifiedTopology: true;
  } & ConnectOptions;
};
export const dbConnection: dbConnectionType = {
  url: `${DB_URL}`,
  options: {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
};
