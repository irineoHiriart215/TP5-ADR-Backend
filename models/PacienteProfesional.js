'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class PacienteProfesional extends Model {
    static associate(models){
        PacienteProfesional.belongsTo(models.Paciente, {
        foreignKey: 'paciente_id'
        });
        PacienteProfesional.belongsTo(models.UsuarioProfesional, {
        foreignKey: 'profesional_id'
        });
    }
  }

  PacienteProfesional.init({
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
    modelName: 'PacienteProfesional',
    tableName: 'paciente_profesional',
    timestamps: false
  });

  return PacienteProfesional;
};
