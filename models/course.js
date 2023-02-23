'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Course extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Course.belongsTo(models.Profile, { foreignKey: 'profileId' })
    }
  }
  Course.init({
    subject: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    code: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 101,
        max: 499,
      },
    },
    days: {
      type: DataTypes.ENUM("M, W, F", "T, Th"),
      defaultValue: "M, W, F",
    },
    time: {
      type: DataTypes.ENUM('8:00 - 9:00', '9:20 - 10:20', '10:40 - 11:40', '12:00 - 1:00', '1:20 - 2:20', '2:40 - 3:40', '4:00 - 5:00'),
      defaultValue: '8:00 - 9:00'
    },
    hours: {
      type: DataTypes.ENUM('1', '2', '3', '4'),
      defaultValue: '3',
    },
    profileId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      onDelete: 'CASCADE',
      references: {
        model: 'Profiles',
        key: 'id'
      },
    }
  }, {
    sequelize,
    modelName: 'Course',
  });
  return Course;
};