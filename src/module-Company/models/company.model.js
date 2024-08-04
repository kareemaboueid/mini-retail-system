import mongoose from 'mongoose';
import { company } from '../../../database/structure.db';
import SCH_COMPANY from '../schemas/company.schema';

/** ### COMPANY MODEL */
const MDL_COMPANY = mongoose.model(company.model, SCH_COMPANY);

export default MDL_COMPANY;
