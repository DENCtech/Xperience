import dotenv from 'dotenv';

dotenv.config();

export default {
 up: (queryInterface, Sequelize) => queryInterface.createTable('Xperiences', {
  id: {
   allowNull: false,
   autoIncrement: true,
   primaryKey: true,
   type: Sequelize.INTEGER
  },
  title: {
   type: Sequelize.TEXT
  },
  body: {
   type: Sequelize.TEXT,
   allowNull: false
  },
  image: {
   type: Sequelize.TEXT,
   allowNull: false,
   defaultValue: process.env.DEFAULT_XPERIENCE_IMAGE
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
 down: queryInterface => queryInterface.dropTable('Xperiences')
};
