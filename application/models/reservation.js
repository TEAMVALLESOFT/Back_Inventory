'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class reservation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.borrowing,{foreignKey: 'borrowing_fk', as: 'Prestamo Asociado'});
      this.belongsTo(models.article,{foreignKey: 'articles_fk', as: 'Articulo Asociado'})
    }
  };
  reservation.init({
    borrowing_fk: DataTypes.INTEGER,
    articles_fk: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'reservation',
  });
  return reservation;
};
