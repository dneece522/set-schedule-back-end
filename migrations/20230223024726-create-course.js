'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Courses', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      subject: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      code: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
          min: 101,
          max: 499,
        },
      },
      days: {
        type: Sequelize.ENUM("M, W, F", "T, Th"),
        defaultValue: "M, W, F",
      },
      time: {
        type: Sequelize.ENUM('8:00 - 9:00', '9:20 - 10:20', '10:40 - 11:40', '12:00 - 1:00', '1:20 - 2:20', '2:40 - 3:40', '4:00 - 5:00'),
        defaultValue: '8:00 - 9:00'
      },
      hours: {
        type: Sequelize.ENUM('1', '2', '3', '4'),
        defaultValue: '3',
      },
      profileId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        onDelete: 'CASCADE',
        references: {
          model: 'Profiles',
          key: 'id'
        },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Courses');
  }
};