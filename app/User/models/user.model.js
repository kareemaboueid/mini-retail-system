import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import sch_user from '../schemas/user.schema.js';
import { user } from '../../../database/structure.db.js';
import { SALT_ROUNDS } from '../../../configs/env.cnfg.js';

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
  return user;
};

/** ### USER MODEL */
const MDL_USER = mongoose.model(user.model, sch_user);

export default MDL_USER;
