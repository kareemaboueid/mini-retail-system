import * as dotenv from 'dotenv';

dotenv.config();

/**
 * ### This file contains the environment variables
 */
const {
  NODE_ENV,
  PORT,
  SALT_ROUNDS,
  // cloud db
  DB_USERNAME,
  DB_PASSWORD,
  DB_CLOUD_REAL,
  DB_CLOUD_TEST,
} = process.env;

export {
  /**
   * @name NODE_ENV
   * @description The environment the server is running in.
   */
  NODE_ENV,

  /**
   * @name PORT
   * @description The port the server is running on.
   */
  PORT,

  /**
   * @name SALT_ROUNDS
   * @description The number of rounds to use when bcrypting.
   */
  SALT_ROUNDS,

  /**
   * @name DB_LOCAL_REAL
   * @description The real local database URI.
   */
  DB_CLOUD_REAL,

  /**
   * @name DB_LOCAL_TEST
   * @description The test local database URI.
   */
  DB_CLOUD_TEST,

  /**
   * @name DB_USERNAME
   * @description The username for the cloud database.
   */
  DB_USERNAME,

  /**
   * @name DB_PASSWORD
   * @description The password for the cloud database.
   */
  DB_PASSWORD,
};
