/*!
 * mini-retail-system
 * Copyright(c) 2024 Kareem Aboueid.
 */

import express from 'express';
import morgan from 'morgan';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import mongoose from 'mongoose';

// ROUTERS:
import RT_USER from './app/User/routes/user.router.js';

// MIDDLEWARES:
import mdwr_handle_error from './middlewares/handle_errors.mdwr.js';

// CONFIGS & DB:
import db_connect from './configs/db/connect.db.js';
import cnfg_server_listen from './configs/server/server_listen.cnfg.js';
import cnst_paths_strings from './constants/paths_strings.cnst.js';
import { PORT, NODE_ENV } from './configs/env/env.cnfg.js';

// SERVER INITIALIZATION:
const app = express();

// CONFIGS MIDDLEWARES:
dotenv.config();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(helmet());
app.use(cookieParser());
if (NODE_ENV === 'development') app.use(morgan('dev'));
if (NODE_ENV === 'development') mongoose.set('debug', true);
// TODO [DEV] add development logger (by winston)

// PATHS:
const path = cnst_paths_strings();

// SERVER ROUTERS:
app.use(path.user.root, RT_USER);

// ERROR HANDLING:
app.use(mdwr_handle_error);

// RUN SERVER:
db_connect();
cnfg_server_listen(app, PORT);
