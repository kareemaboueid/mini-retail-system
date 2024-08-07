import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import sch_user from '../schemas/user.schema.js';
import cnst_db_strings from '../../../constants/db_strings.cnst.js';
import { SALT_ROUNDS } from '../../../configs/env/env.cnfg.js';

const data = cnst_db_strings();

// bcrypt password before saving:
sch_user.pre('save', async function (next) {
  try {
    if (this.isModified('data_user_password')) {
      this.data_user_password = await bcrypt.hash(
        this.data_user_password,
        Number(SALT_ROUNDS),
      );
    }
    next();
  } catch (error) {
    next(error);
  }
});

// validate password:
sch_user.methods.validate_password = async function (_entered_password) {
  return await bcrypt.compare(_entered_password, this.data_user_password);
};

// get user exluding one field or many fields:
sch_user.methods.exclude = async function (_field) {
  delete this.toObject()[_field];
  return this;
};

/** ### USER MODEL */
const MDL_USER = mongoose.model(data.user.model, sch_user);

export default MDL_USER;
