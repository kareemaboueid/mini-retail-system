import asyncHandler from 'express-async-handler';
import { StatusCodes } from 'http-status-codes';
import MDL_USER from '../../models/user/user.model.js';
import hlp_jsend from '../../../helpers/jsend.hlp.js';

/**
 * ### Controller: CTRL_USER_GET
 * @method `GET`
 * @route `/v1/users/:username`
 */

const CTRL_USER_GET = asyncHandler(async (_request, _response) => {
  // ------ START ------ //

  try {
    // get data from client:
    const { username: eup_user_username } = _request.params;

    // check required fields:
    if (!eup_user_username) {
      _response.status(StatusCodes.BAD_REQUEST);
      throw new Error('Username is required');
    }

    // database user query (not freeze):
    const USER = await MDL_USER.findOne({
      data_user_username: eup_user_username,
    }).where({ flag_user_freeze: false });

    // check if user exists:
    if (!USER) {
      _response.status(StatusCodes.BAD_REQUEST);
      throw new Error('User does not exist');
    }

    // send success response:
    _response.status(StatusCodes.OK).json(hlp_jsend(StatusCodes.OK, USER));

    // ------ HANDLE ERRORS ------ //
  } catch (_error) {
    // send error response:
    _response.status(StatusCodes.BAD_REQUEST);
    throw new Error(_error.message);
  }

  // ------ END ------ //
});

export default CTRL_USER_GET;
