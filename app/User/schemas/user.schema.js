import mongoose from 'mongoose';
import * as EmailValidator from 'email-validator';
import cnst_db_strings from '../../../constants/db_strings.cnst.js';

const data = cnst_db_strings();

/** ### User schema */
const SCH_USER = new mongoose.Schema(
  // ------ START ------ //

  {
    data_user_first_name: {
      type: String,
      required: [true, 'First name is required'],
      trim: true,
      maxLength: [50, 'First name is too long (maximum is 50 characters)'],
    },

    data_user_last_name: {
      type: String,
      required: [true, 'Last name is required'],
      trim: true,
      maxLength: [50, 'Last name is too long (maximum is 50 characters)'],
    },

    data_user_email_address: {
      type: String,
      required: [true, 'Email address is required'],
      trim: true,
      lowercase: true,
      unique: true,
      validate(_value) {
        if (!EmailValidator.validate(_value)) {
          throw new Error(
            'Invalid email address format, required format: `name@mail.com`',
          );
        }
      },
    },

    data_user_phone_number: {
      type: String,
      required: [true, 'Phone number is required'],
      trim: true,
      unique: true,
      default: '9999999999',
      minLength: [10, 'Phone number is too short (minimum is 10 characters)'],
      maxLength: [10, 'Phone number is too long (maximum is 10 characters)'],
      validate(_value) {
        if (!_value.startsWith('05')) {
          throw new Error('Invalid phone number format, required format: `05XXXXXXXX');
        }
      },
    },

    data_user_job_position: {
      type: String,
      required: [true, 'Job position is required'],
      trim: true,
      unique: true,
      maxLength: [50, 'Job position is too long (maximum is 50 characters)'],
    },

    data_user_nationallity: {
      type: String,
      required: [true, 'Nationallity is required'],
      trim: true,
      maxLength: [50, 'Nationallity is too long (maximum is 50 characters)'],
    },

    data_user_civil_id: {
      index: true,
      type: String,
      required: [true, 'Civil ID is required'],
      trim: true,
      unique: true,
      minLength: [10, 'Civil ID is too short (minimum is 10 characters)'],
      maxLength: [10, 'Civil ID is too long (maximum is 10 characters)'],
      validate(_value) {
        if (this.data_user_nationallity === 'saudi') {
          if (!_value.startsWith('1')) {
            throw new Error(
              'Invalid civil ID format, should start with `1` for Saudi nationallity',
            );
          }
        }
      },
    },

    data_user_username: {
      index: true,
      type: String,
      required: [true, 'Username is required'],
      trim: true,
      lowercase: true,
      unique: true,
      maxLength: [50, 'Username is too long (maximum is 50 characters)'],
      validate(_value) {
        if (/\s/.test(_value)) {
          throw new Error('Username must not contain spaces');
        }
      },
    },

    data_user_password: {
      type: String,
      required: [true, 'Password is required'],
      trim: true,
      minLength: [1, 'Password is too short (minimum is 1 characters)'],
      maxLength: [50, 'Password is too long (maximum is 50 characters)'],
    },

    flag_freeze: {
      type: Boolean,
      default: false,
    },
  },

  {
    timestamps: true,
    collection: data.user.coll,
  },

  { toJSON: { virtuals: true }, toObject: { virtuals: true } },

  // ------ END ------ //
);

export default SCH_USER;
