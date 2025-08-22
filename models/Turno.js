'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Turno extends Model {
    static associate(models) {
        Turno.belongsTo(models.UsuarioProfesional, {
        foreignKey: 'profesional_id'
        });        
        Turno.belongsTo(models.Paciente, {
            foreignKey: 'paciente_id'
        });
    }
  }

  Turno.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    fecha: {
      type: DataTypes.DATE,
      allowNull: false
    },
    hora: {
      type: DataTypes.TIME,
      allowNull: false
    },
    motivo: {
      type: DataTypes.STRING,
      allowNull: false
    },
    tipo: {
      type: DataTypes.ENUM('consultorio', 'domicilio'),
      allowNull: false
    },
    paciente_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    profesional_id: {
    type: DataTypes.INTEGER,
    allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Turno',
    tableName: 'turno',
    timestamps: false
  });

  return Turno;
};
