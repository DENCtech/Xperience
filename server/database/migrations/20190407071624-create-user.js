import dotenv from 'dotenv';

dotenv.config();

export default {
 up: (queryInterface, Sequelize) => queryInterface.createTable('Users', {
  id: {
   allowNull: false,
   autoIncrement: true,
   primaryKey: true,
   type: Sequelize.INTEGER
  },
  fullname: {
   type: Sequelize.STRING,
   allowNull: false
  },
  email: {
   type: Sequelize.STRING,
   unique: true,
   allowNull: false
  },
  hashedPassword: {
   type: Sequelize.STRING,
   allowNull: false
  },
  bio: {
   type: Sequelize.STRING,
   allowNull: true,
   defaultValue: 'n/a'
  },
  image: {
   type: Sequelize.STRING,
   allowNull: true,
   defaultValue: process.env.DEFAULT_PROFILE_IMAGE
  },
  createdAt: {
   allowNull: false,
   type: Sequelize.DATE
  },
  updatedAt: {
   allowNull: false,
   type: Sequelize.DATE
  }
 }),
 down: queryInterface => queryInterface.dropTable('Users')
};
