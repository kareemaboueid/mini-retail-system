import express from 'express';
import CTRL_USER_CREATE from '../controllers/user/user_create.ctrl.js';
// import CTRL_USER_LOGIN from '../controllers/user/user_login.ctrl.js';
// import CTRL_USER_LOGOUT from '../controllers/user/user_logout.ctrl.js';
import CTRL_USER_GET from '../controllers/user/user_get.ctrl.js';
// import CTRL_USER_PASSWORD_UPDATE from '../controllers/user/user_password_update.ctrl.js';
// import CTRL_USER_FREEZE from '../controllers/user/user_freeze.ctrl.js';
// import authenticate_route from '../../middlewares/authenticate_route.mdwr';
import { user } from '../../configs/endpoints.cnfg.js';

/**
 * ## USER ROUTER
 * @route `/v1/users`
 * @controller `CTRL_USER_CREATE()` POST `/v1/users/create`
 * @controller `CTRL_USER_LOGIN()` POST `/v1/users/login`
 * @controller `CTRL_USER_LOGOUT()` POST `/v1/users/logout`
 * @controller `CTRL_USER_GET()` GET `/v1/users/:username`
 * @controller `CTRL_USER_PASSWORD_UPDATE()` PATCH `/v1/users/:username?update=password`
 * @controller `CTRL_USER_FREEZE()` PATCH `/v1/users/:username?update=freeze`
 */
const RT_USER = express.Router();

// POST /v1/users/create
RT_USER.post(user.create, CTRL_USER_CREATE);

// POST /v1/users/login
// RT_USER.post(user.login, CTRL_USER_LOGIN);

// // POST /v1/users/logout
// RT_USER.post(user.logout, CTRL_USER_LOGOUT);

// GET /v1/users/:username
RT_USER.get(user.username, authenticate_route,CTRL_USER_GET);

// // PATCH /v1/users/:username?update=password
// RT_USER.patch(user.username, authenticate_route,CTRL_USER_PASSWORD_UPDATE);

// // PATCH /v1/users/:username?update=freeze
// RT_USER.patch(user.username, authenticate_route,CTRL_USER_FREEZE);

export default RT_USER;