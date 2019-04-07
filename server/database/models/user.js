import dotenv from 'dotenv';

dotenv.config();

export default (sequelize, DataTypes) => {
 const User = sequelize.define('User',
  {
   fullname: {
    type: DataTypes.STRING,
    allowNull: false
   },
   email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
   },
   hashedPassword: {
    type: DataTypes.STRING,
    allowNull: false
   },
   bio: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: 'n/a'
   },
   image: {
    type: DataTypes.TEXT,
    allowNull: true,
    defaultValue: process.env.DEFAULT_PROFILE_IMAGE
   }
  },
  {});
 User.associate = (models) => {
  // associations can be defined here
  const { Xperience } = models;

  User.hasMany(Xperience, {
   foreignKey: 'id',
   onDelete: 'CASCADE'
  });
 };
 return User;
};
