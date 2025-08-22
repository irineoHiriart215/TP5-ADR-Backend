
'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Paciente extends Model {
    static associate(models) {
        Paciente.belongsTo(models.ObraSocial, { foreignKey: 'obra_social_id' });
        Paciente.belongsToMany(models.UsuarioProfesional, {
        through: models.PacienteProfesional,
        foreignKey: 'paciente_id',
        otherKey: 'profesional_id'
        });
        Paciente.hasMany(models.Turno, { foreignKey: 'paciente_id' });
    }
  }

  Paciente.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false
    },
    dni: {
      type: DataTypes.STRING,
      allowNull: false
    },
    fecha_nacimiento: {
      type: DataTypes.DATE,
      allowNull: false
    },
    telefono: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true
    },
    observaciones: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    obra_social_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Paciente',
    tableName: 'paciente',
    timestamps: false
  });

  return Paciente;
};
