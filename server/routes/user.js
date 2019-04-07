import express from 'express';
import { Users } from '../controller';
import {
 validateUserRegistrationFields,
 validateUserLoginFields,
 validationHandler,
 passwordCheck,
 checkEmailFormat,
 AuthenticateUser
} from '../middleware';

const authRoutes = express.Router();

// Register a new user
authRoutes.post('/users/register',
 validateUserRegistrationFields,
 validationHandler,
 checkEmailFormat,
 passwordCheck,
 AuthenticateUser.checkUserExist,
 Users.registerUser);

// Login a  user
authRoutes.post('/users/login', validateUserLoginFields, validationHandler, Users.loginUser);

export default authRoutes;
