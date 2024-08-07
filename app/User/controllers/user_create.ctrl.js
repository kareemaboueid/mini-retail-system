import asyncHandler from 'express-async-handler';
import { StatusCodes } from 'http-status-codes';
import MDL_USER from '../models/user.model.js';
import hlp_jsend from '../../../helpers/jsend.hlp.js';

/**
 * ### Controller: CTRL_USER_CREATE
 * @method `POST`
 * @route `/v1/users/create`
 */

const CTRL_USER_CREATE = asyncHandler(async (_request, _response) => {
  // ------ START ------ //

  try {
    // get data from client:
    const {
      first_name: eud_user_first_name,
      last_name: eud_user_last_name,
      email_address: eud_user_email_address,
      phone_number: eud_user_phone_number,
      job_position: eud_user_job_position,
      nationallity: eud_user_nationallity,
      civil_id: eud_user_civil_id,
      username: eud_user_username,
      password: eud_user_password,
      confirm_password: eud_user_confirm_password,
    } = _request.body;

    // check if all required fields are provided:
    if (
      !eud_user_first_name ||
      !eud_user_last_name ||
      !eud_user_email_address ||
      !eud_user_phone_number ||
      !eud_user_job_position ||
      !eud_user_nationallity ||
      !eud_user_civil_id ||
      !eud_user_username ||
      !eud_user_password ||
      !eud_user_confirm_password
    ) {
      _response.status(StatusCodes.BAD_REQUEST);
      throw new Error('All fields are required');
    }

    // check if password and confirm password match:
    if (eud_user_password !== eud_user_confirm_password) {
      _response.status(StatusCodes.BAD_REQUEST);
      throw new Error('Password and confirm password do not match');
    }

    // database user query (not freeze):
    const USER = await MDL_USER.findOne({
      data_user_username: eud_user_username,
    }).where({ flag_user_freeze: false });

    // check if user exists: (prevent duplicate)
    if (USER) {
      _response.status(StatusCodes.BAD_REQUEST);
      throw new Error('User already exists, try another username');
    }

    // create new user in database:
    await MDL_USER.create({
      data_user_first_name: eud_user_first_name,
      data_user_last_name: eud_user_last_name,
      data_user_email_address: eud_user_email_address,
      data_user_phone_number: eud_user_phone_number,
      data_user_job_position: eud_user_job_position,
      data_user_nationallity: eud_user_nationallity,
      data_user_civil_id: eud_user_civil_id,
      data_user_username: eud_user_username,
      data_user_password: eud_user_password,
    });

    // TODO save the new user info in secure httpOnly cookie w/ JWT:

    // send success response:
    _response.status(StatusCodes.CREATED).json(
      hlp_jsend(StatusCodes.CREATED, {
        message: `User ${eud_user_username} created successfully`,
      }),
    );

    // ------ HANDLE ERRORS ------ //
  } catch (_error) {
    // send error response:
    _response.status(StatusCodes.BAD_REQUEST);
    throw new Error(_error.message);
  }

  // ------ END ------ //
});

export default CTRL_USER_CREATE;
