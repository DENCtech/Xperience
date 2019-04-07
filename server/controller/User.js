import db from '../database/models';
import HelperUtils from '../utils';

const { User } = db;

/**
 * @description Controller to authenticate users
 * @return {undefined}
 */
export default class Users {
 /**
  * @description controller function that handles the creation of a User
  *
  * @param {object} req - Express request object
  * @param {object} res - Express response object
  * @return {undefined}
  */
 static async registerUser(req, res) {
  const { fullname, email, password } = req.body;

  const hash = await HelperUtils.hashPassword(password);

  const formInputs = { fullname, email, hashedPassword: hash };
  try {
   const createUser = await User.create(formInputs);
   delete formInputs.hashedPassword;
   const token = HelperUtils.generateToken({
    ...formInputs,
    id: createUser.id
   });

   res.status(201).json({
    status: 'success',
    message: 'user created successfully',
    user: {
     email,
     token,
     fullname,
     bio: createUser.bio,
     image: createUser.image
    }
   });
  } catch (error) {
   return res.status(500).json({ status: 'failed', message: 'Registration Unsuccessful' });
  }
 }

 /**
  * @description contoller function that logs a user in
  * @param {object} req - request object
  * @param {object} res - response object
  * @returns {object} user - Logged in user
  */
 static async loginUser(req, res) {
  const { email, password } = req.body;
  try {
   const getUser = await User.findOne({
    where: { email }
   });
   if (getUser) {
    const { id, fullname, bio, image, hashedPassword } = getUser;
    const isValidPassword = HelperUtils.comparePasswordOrEmail(password, hashedPassword);
    if (!isValidPassword) {
     return res.status(400).json({ status: 'failed', message: 'Invalid email or password' });
    }
    const userToken = await HelperUtils.generateToken({ id, email, fullname });
    return res.status(200).json({
     status: 'success',
     message: 'user logged in successfully',
     user: {
      email,
      image,
      fullname,
      bio,
      token: userToken
     }
    });
   }
   return res.status(400).json({ status: 'failed', message: "User doesn't exist on the database" });
  } catch (error) {
   return res.status(500).json({ status: 'failed', message: 'Login Unsuccessful' });
  }
 }
}
