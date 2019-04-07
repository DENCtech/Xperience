import dotenv from 'dotenv';

dotenv.config();

export default (sequelize, DataTypes) => {
 const Xperience = sequelize.define('Xperience',
  {
   title: {
    type: DataTypes.TEXT,
    allowNull: false
   },
   body: {
    type: DataTypes.TEXT,
    allowNull: false
   },
   image: {
    type: DataTypes.TEXT,
    allowNull: false,
    defaultValue: process.env.DEFAULT_XPERIENCE_IMAGE
   }
  },
  {});
 Xperience.associate = (models) => {
  // associations can be defined here
 };
 return Xperience;
};
