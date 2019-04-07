import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import readingTime from 'reading-time';

dotenv.config();

const secretKey = process.env.SECRET_KEY;

/**
 * @class HelperUtils
 * @description Specifies reusable helper methods
 * @exports HelperUtils
 */
class HelperUtils {
 /**
  * @method generateToken
  * @description Generate a token from a given payload
  * @param {object} payload The user payload to tokenize
  * @returns {string} JSON Web Token
  */
 static generateToken(payload) {
  return jwt.sign(payload, secretKey);
 }

 /**
  * @method timedToken
  * @description Generate a token with timer
  * @param {object} hash encrypted data
  * @param {object} time
  * @returns {string} Token
  */
 static timedToken(hash, time) {
  return jwt.sign({
   hash
  },
  secretKey,
  { expiresIn: time });
 }

 /**
  * @method verifyToken
  * @description Verifies a token and decodes it to its subsequent payload
  * @param {string} token The token to decode
  * @returns {object} The resulting payload
  */
 static verifyToken(token) {
  try {
   const payload = jwt.verify(token, secretKey);
   return payload;
  } catch (error) {
   return false;
  }
 }

 /**
  * @method hashPassword
  * @description Hashes a users password
  * @param {string} password The users password
  * @returns {string} The resulting hashed password
  */
 static hashPassword(password) {
  const hash = bcrypt.hashSync(password, 8);
  return hash;
 }

 /**
  * @method comparePassword
  * @description Hashes a users password
  * @param {string} passwordOrEmail The users password/email
  * @param {string} hash The users hashed password/email
  * @returns {string} The resulting hashed password
  */
 static comparePasswordOrEmail(passwordOrEmail, hash) {
  const isPassword = bcrypt.compareSync(passwordOrEmail, hash);
  return isPassword;
 }

 /**
  * @description Method that estimates the reading time for an expirence
  * @param {string} experienceBody
  * @return {object} estimatedTime
  */
 static estimateReadingTime(experienceBody) {
  const estimatedTime = readingTime(experienceBody);
  if (estimatedTime.minutes < 1) {
   estimatedTime.text = '< 1 min read';
   return estimatedTime;
  }
  return estimatedTime;
 }

 /**
  * @method isValidEmail
  * @description Validates an email field
  * @param {string} email - users email
  * @return {boolean} if email is valid
  */
 static isValidEmail(email) {
  const emailMatch = /^([A-z0-9]+)([._-]{0,1})([A-z0-9]+)@([A-z0-9-_.]+)\.([A-z]{2,3})$/;
  const emailEvaluation = emailMatch.test(email);
  return emailEvaluation;
 }
}

export default HelperUtils;
