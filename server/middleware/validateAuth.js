import { body, validationResult } from 'express-validator/check';
import HelperUtils from '../utils';

const validateUserRegistrationFields = [
 body('fullname')
  .exists({
   checkNull: true,
   checkFalsy: true
  })
  .withMessage('fullname is required')
  .isLength({ min: 2 })
  .withMessage('minimum character length for fullname is 2'),

 body('email')
  .exists({
   checkNull: true,
   checkFalsy: true
  })
  .withMessage('email is required'),

 body('password')
  .exists({
   checkNull: true,
   checkFalsy: true
  })
  .withMessage('password is required')
  .isLength({ min: 8 })
  .withMessage('minimum character length for password is 8'),

 body('confirmPassword')
  .exists({
   checkNull: true,
   checkFalsy: true
  })
  .withMessage('confirm password is required')
];

const validateUserLoginFields = [
 body('email')
  .exists({
   checkNull: true,
   checkFalsy: true
  })
  .withMessage('email is required'),

 body('password')
  .exists({
   checkNull: true,
   checkFalsy: true
  })
  .withMessage('password required')
];

const passwordCheck = (req, res, next) => {
 const { password, confirmPassword } = req.body;

 const isEqual = password === confirmPassword;

 if (!isEqual) {
  return res.status(400).json({
   status: 'failed',
   message: "password doesn't match"
  });
 }
 next();
};

const validationHandler = (req, res, next) => {
 const errors = validationResult(req);
 const allErrors = [];
 if (!errors.isEmpty()) {
  errors.array().forEach(err => allErrors.push(err.msg));
  return res.status(400).json({
   status: 400,
   message: allErrors
  });
 }
 return next();
};

const checkEmailFormat = (req, res, next) => {
 const { email } = req.body;
 const isValidEmail = HelperUtils.isValidEmail(email);

 if (!isValidEmail) {
  return res.status(400).json({
   status: 400,
   message: 'invalid email format'
  });
 }
 return next();
};

export {
 validateUserLoginFields,
 validateUserRegistrationFields,
 validationHandler,
 passwordCheck,
 checkEmailFormat
};
