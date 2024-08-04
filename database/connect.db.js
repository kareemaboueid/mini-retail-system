import mongoose from 'mongoose';
import {
  NODE_ENV,
  DB_USERNAME,
  DB_PASSWORD,
  DB_CLOUD_REAL,
  DB_CLOUD_TEST,
} from '../configs/env.cnfg.js';

/**
 * ### Sets up a MongoDB connection using the provided MongoDB URI via `mongoose.connect()` method.
 * @param {string} _mongodb_uri - The MongoDB URI to connect to.
 */
const db_mongoose_setup = async (_mongodb_uri) => {
  try {
    // ------ START ------ //

    // define the database connection:
    const db_connect = await mongoose.connect(_mongodb_uri.toString());
    // extract the connection details:
    const db_type = db_connect.connection.host ? 'cloud' : 'local';
    const db_port = db_connect.connection.port;
    const db_name = db_connect.connection.name;

    if (NODE_ENV === 'development') {
      // eslint-disable-next-line no-console
      console.log(`DB CONNECTED: TYPE: ${db_type} | PORT: ${db_port} | NAME: ${db_name}`);
    }

    // ------ HANDLE ERRORS ------ //
  } catch (_error) {
    // send error:
    throw new Error(`DB CONNECTION ERROR:\n\t${_error}`);
  }

  // ------ END ------ //
};

/** ### Connects to the CLOUD MongoDB database using the provided MongoDB URI. */
const db_connect = async () => {
  try {
    // ------ START ------ //

    // set up the MongoDB URI:
    const db_username = DB_USERNAME;
    const db_password = DB_PASSWORD;
    const db_test = DB_CLOUD_TEST.replace('<U>', db_username).replace('<P>', db_password);
    const db_real = DB_CLOUD_REAL.replace('<U>', db_username).replace('<P>', db_password);
    const _mongodb_uri = NODE_ENV === 'development' ? db_test : db_real;

    // set up the MongoDB connection:
    await db_mongoose_setup(_mongodb_uri);

    // ------ HANDLE ERRORS ------ //
  } catch (_error) {
    // send error:
    throw new Error(`DB CLOUD CONNECT ERROR:\n\t${_error}`);
  }

  // ------ END ------ //
};

export default db_connect;
