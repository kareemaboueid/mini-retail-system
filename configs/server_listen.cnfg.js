/* eslint-disable no-console */
import { NODE_ENV } from './env.cnfg.js';

/**
 * ### Sets up the server to listen on the specified port.
 * @param {object} _app The Express app instance.
 * @param {number} _port The port number to listen on.
 */

const cnfg_server_listen = (_app, _port) => {
  try {
    // ------ START ------ //

    _app.listen(Number(_port), () => {
      if (NODE_ENV === 'development') {
        console.log(`NODE_ENV: ${NODE_ENV}`);
        console.log(`SERVER LISTENING: PORT: ${_port} | HOST: http://localhost:${_port}`);
      }
    });

    // ------ HANDLE ERRORS ------ //
  } catch (_error) {
    // send error:
    throw new Error(`SERVER ERROR:\n\t${_error}`);
  }

  // ------ END ------ //
};

export default cnfg_server_listen;
