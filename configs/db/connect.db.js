import db_mongoose_setup from './mongoose_setup.db.js';
import {
  NODE_ENV,
  DB_USERNAME,
  DB_PASSWORD,
  DB_CLOUD_REAL,
  DB_CLOUD_TEST,
} from '../env/env.cnfg.js';

/** ### Connects to the MongoDB Atlas database using the provided MongoDB URI. */
const db_connect = async () => {
  // ------ START ------ //

  // set up the MongoDB URI:
  const db_username = DB_USERNAME;
  const db_password = DB_PASSWORD;
  const db_test = DB_CLOUD_TEST.replace('<U>', db_username).replace('<P>', db_password);
  const db_real = DB_CLOUD_REAL.replace('<U>', db_username).replace('<P>', db_password);
  const _mongodb_uri = NODE_ENV === 'development' ? db_test : db_real;

  // set up the MongoDB connection:
  await db_mongoose_setup(_mongodb_uri);

  // ------ END ------ //
};

export default db_connect;
