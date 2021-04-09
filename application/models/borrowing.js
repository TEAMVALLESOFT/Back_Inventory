'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class borrowing extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  borrowing.init({
    auth_state: DataTypes.STRING,
    pick_up_date: DataTypes.DATE,
    return_date: DataTypes.DATE,
    obs: DataTypes.STRING,
    user_fk: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'borrowing',
  });
  return borrowing;
};