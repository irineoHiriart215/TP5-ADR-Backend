
'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class ObraSocial extends Model {
    static associate(models) {    
        ObraSocial.hasMany(models.Paciente, {
            foreignKey: 'obra_social_id'
        });
    }
  }

  ObraSocial.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false
    },
    telefono: {
      type: DataTypes.STRING,
      allowNull: true
    },
    direccion: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    sequelize,
    modelName: 'ObraSocial',
    tableName: 'obra_social',
    timestamps: false
  });

  return ObraSocial;
};