import mongoose from 'mongoose';
import { NODE_ENV } from '../env/env.cnfg.js';

/**
 * ### Sets up a MongoDB connection using the provided MongoDB URI via `mongoose.connect()` method.
 * @param {string} _mongodb_uri - The MongoDB URI to connect to.
 */
const db_mongoose_setup = async (_mongodb_uri) => {
  // ------ START ------ //

  try {
    // define the database connection:
    const db_connect = await mongoose.connect(_mongodb_uri.toString());
    // extract the connection details:
    const db_type = db_connect.connection.host ? 'cloud' : 'local';
    const db_port = db_connect.connection.port;
    const db_name = db_connect.connection.name;

    if (NODE_ENV === 'development') {
      // TODO [DEV] add development logger (by winston)
      // eslint-disable-next-line no-console
      console.log(`DB CONNECTED: TYPE: ${db_type} | PORT: ${db_port} | NAME: ${db_name}`);
    }

    // ------ HANDLE ERRORS ------ //
  } catch (_error) {
    // send error:
    // TODO [DEV] add development logger (by winston)
    throw new Error(`DB CONNECTION ERROR:\n\t${_error}`);
  }

  // ------ END ------ //
};

export default db_mongoose_setup;
