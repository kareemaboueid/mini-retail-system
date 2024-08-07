import { getStatusMessage } from 'http-status-message';

/**
 * ### Creates an error object with the specified error code and error message.
 * @param {number} _error_code - The error StatusCodes.
 * @param {string} _error_message - The error message.
 * @param {string} _error_stack - The error stack trace.
 */

const hlp_error_send = (_error_code, _error_message, _error_stack) => {
  // ------ START ------ //

  const error_object = {
    error: 'An error occurred',
    status: {
      code: _error_code,
      message: getStatusMessage(_error_code, 'short').message,
    },
    message: _error_message,
    stack: _error_stack,
  };

  return error_object;

  // ------ END ------ //
};

export default hlp_error_send;
