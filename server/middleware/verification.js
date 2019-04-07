import db from '../database/models';
import HelperUtils from '../utils';

const { User } = db;

/**
 * @class AuthenticateUser
 * @description Authenticates a given user
 * @exports AuthenticateUser
 */
class AuthenticateUser {
 /**
  * @method verifyAuthHeader
  * @description Verifies that the authorization was set
  * @param {object} req - The Request Object
  * @param {object} res - The Response Object
  * @returns {object} - JSON response object
  */
 static async verifyAuthHeader(req) {
  const { authorization } = req.headers;
  if (!authorization) {
   return { error: 'auth' };
  }

  const token = authorization.split(' ')[1];
  const payload = HelperUtils.verifyToken(token);
  try {
   const { id, email } = payload;
   const user = await User.findOne({ where: { id, email } });
   if (!user) {
    return { error: 'token' };
   }
   return user;
  } catch (err) {
   return { error: 'Error communicating with DB' };
  }
 }

 /**
  * @method verifyUser
  * @description Verifies the token provided by the user
  * @param {object} req - The Request Object
  * @param {object} res - The Response Object
  * @param {callback} next - Callback method
  * @returns {object} - JSON response object
  */
 static async verifyUser(req, res, next) {
  const payload = await AuthenticateUser.verifyAuthHeader(req);
  let error;

  if (payload.error === 'auth') {
   error = 'No authorization header was specified.';
  } else if (payload.error === 'token') {
   error = 'The provided token is invalid';
  }

  if (payload.error) {
   return res.status(401).json({ status: 'failed', error });
  }

  req.user = payload;
  return next();
 }

 /**
  * @method verifyUserId
  * @description verifies an id passed in the route
  * @param {object} req - The Request Object
  * @param {object} res - The Response Object
  * @param {callback} next - Callback method
  * @returns {object} - JSON response object
  */
 static async verifyUsername(req, res, next) {
  const { id } = req.params;
  try {
   const user = await User.findOne({ where: { id } });
   if (!user) {
    return res.status(404).json({ message: 'User not found' });
   }
   req.userInfo = user;
   return next();
  } catch (err) {
   return res.status(500).json({ status: 'failed', message: 'Could not validate username' });
  }
 }

 /**
  * @method checkUserExist
  * @description checks if user exists
  * @param {object} req - The Request Object
  * @param {object} res - The Response Object
  * @param {callback} next - Callback method
  * @returns {object} - JSON response object
  */
 static async checkUserExist(req, res, next) {
  const { email } = req.body;
  try {
   const user = await User.findOne({ where: { email } });
   if (user) {
    return res
     .status(409)
     .json({ status: 'failed', message: `User with email ${email} already exists` });
   }
   return next();
  } catch (err) {
   return res.status(500).json({ status: 'failed', message: 'Could not validate username' });
  }
 }
}

export default AuthenticateUser;
