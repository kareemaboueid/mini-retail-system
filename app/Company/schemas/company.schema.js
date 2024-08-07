import mongoose from 'mongoose';
import * as EmailValidator from 'email-validator';
import cnst_db_strings from '../../../constants/db_strings.cnst.js';

const data = cnst_db_strings();

/** ### Company schema */
const SCH_COMPANY = new mongoose.Schema(
  // ------ START ------ //

  {
    COMPANY_CODE: {
      type: String,
    },

    COMPANY_LOGO: {
      type: String,
      trim: true,
    },

    COMPANY_NAME: {
      type: String,
      required: true,
      trim: true,
    },

    COMPANY_COMMERCIAL_REGISTER: {
      COMMERCIAL_NAME: {
        type: String,
        trim: true,
      },

      BUSINESS_ENTITY: {
        type: String,
        trim: true,
      },

      ACTIVITY: {
        type: String,
        trim: true,
      },

      MANAGEMENT: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
        },
      ],

      CRN: {
        type: String,
        trim: true,
        minlength: [10, 'Commercial register must be 10 numbers'],
        maxlength: [10, 'Commercial register must be 10 numbers'],
      },

      ISSUE_DATE: {
        type: Date,
      },

      EXPIRATION_DATE: {
        type: Date,
      },
    },

    COMPANY_NATIONAL_ADDRESS: {
      CITY: {
        type: String,
        trim: true,
      },

      DISTRICT: {
        type: String,
        trim: true,
      },

      STREET: {
        type: String,
        trim: true,
      },

      POSTAL_CODE: {
        type: String,
        trim: true,
      },

      BUILDING_NUMBER: {
        type: String,
        trim: true,
      },
    },

    COMPANY_TAX_REGISTER: {
      TIN: {
        type: String,
        trim: true,
        minlength: [15, 'Tax ID number must be 15 numbers'],
        maxlength: [15, 'Tax ID number must be 15 numbers'],
        validate: {
          validator: (v) => v.endsWith('3'),
          message: (props) => `${props.value} is not a valid tax ID number`,
        },
      },
    },

    COMPANY_UNIFIED_NUMBER: {
      type: String,
      trim: true,
      minlength: [10, 'Unified national number must be 10 numbers'],
      maxlength: [10, 'Unified national number must be 10 numbers'],
      validate: {
        validator: (v) => v.startsWith('7'),
        message: (props) => `${props.value} is not a valid unified national number`,
      },
    },

    COMPANY_CONTACT_INFO: {
      EMAIL_ADDRESSES: [
        {
          type: String,
          trim: true,
          validate: {
            validator: (v) => EmailValidator.validate(v),
            message: (props) => `${props.value} is not a valid email address`,
          },
        },
      ],

      WEBSITES: [
        {
          type: String,
          trim: true,
          validate: {
            validator: (v) => v.startsWith('http'),
            message: (props) => `${props.value} is not a valid website address`,
          },
        },
      ],

      LAND_PHONES: [
        {
          type: String,
          trim: true,
          minlength: [10, 'Land phone must be 10 numbers'],
          maxlength: [10, 'Land phone must be 10 numbers'],
        },
      ],

      MOBILE_PHONE: [
        {
          type: String,
          trim: true,
          minLength: [10, 'Phone number is too short (minimum is 10 characters)'],
          maxLength: [10, 'Phone number is too long (maximum is 10 characters)'],
          validate(_value) {
            if (!_value.startsWith('05')) {
              throw new Error(
                'Invalid phone number format, required format: `05XXXXXXXX',
              );
            }
          },
        },
      ],

      FAX_NUMBERS: [
        {
          type: String,
          trim: true,
        },
      ],
    },

    COMPANY_REGIONS: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Region',
      },
    ],

    COMPANY_FLAG_FREEZE: {
      type: Boolean,
      default: false,
    },
  },

  { timestamps: true, collection: data.company.coll },
  { toJSON: { virtuals: true }, toObject: { virtuals: true } },

  // ------ END ------ //
);

export default SCH_COMPANY;
