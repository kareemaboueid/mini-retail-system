import mongoose from 'mongoose';
import * as EmailValidator from 'email-validator';
import cnst_db_strings from '../../../constants/db_strings.cnst.js';

const data = cnst_db_strings();

/** ### Company schema */
const SCH_COMPANY = new mongoose.Schema(
  // ------ START ------ //

  {
    data_company_legal_name: {
      type: String,
      required: true,
      trim: true,
    },

    data_company_business_entity: {
      type: String,
      trim: true,
    },

    data_company_national_address: {
      city: {
        type: String,
        trim: true,
      },
      district: {
        type: String,
        trim: true,
      },
      street: {
        type: String,
        trim: true,
      },
      postal_code: {
        type: String,
        trim: true,
      },
      building_number: {
        type: String,
        trim: true,
      },
    },

    data_company_crn: {
      number: {
        type: String,
        trim: true,
        minlength: [10, 'Commercial register must be 10 numbers'],
        maxlength: [10, 'Commercial register must be 10 numbers'],
      },
      issue_date: {
        type: Date,
      },
      expiration_date: {
        type: Date,
      },
    },

    data_company_tin: {
      type: String,
      trim: true,
      minlength: [15, 'Tax ID number must be 15 numbers'],
      maxlength: [15, 'Tax ID number must be 15 numbers'],
      validate: {
        validator: (v) => v.endsWith('3'),
        message: (props) => `${props.value} is not a valid tax ID number`,
      },
    },

    data_company_unified_number: {
      type: String,
      trim: true,
      minlength: [10, 'Unified national number must be 10 numbers'],
      maxlength: [10, 'Unified national number must be 10 numbers'],
      validate: {
        validator: (v) => v.startsWith('7'),
        message: (props) => `${props.value} is not a valid unified national number`,
      },
    },

    data_company_contact_info: {
      email_addresses: [
        {
          type: String,
          trim: true,
          validate: {
            validator: (v) => EmailValidator.validate(v),
            message: (props) => `${props.value} is not a valid email address`,
          },
        },
      ],

      websites: [
        {
          type: String,
          trim: true,
          validate: {
            validator: (v) => v.startsWith('http'),
            message: (props) => `${props.value} is not a valid website address`,
          },
        },
      ],

      land_phones: [
        {
          type: String,
          trim: true,
          minlength: [10, 'Land phone must be 10 numbers'],
          maxlength: [10, 'Land phone must be 10 numbers'],
        },
      ],

      mobile_phone: [
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

      fax_numbers: [
        {
          type: String,
          trim: true,
        },
      ],
    },

    data_company_regions: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Region',
      },
    ],

    flag_freeze: {
      type: Boolean,
      default: false,
    },
  },

  { timestamps: true, collection: data.company.coll },
  { toJSON: { virtuals: true }, toObject: { virtuals: true } },

  // ------ END ------ //
);

export default SCH_COMPANY;
