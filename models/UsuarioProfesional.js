
'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class UsuarioProfesional extends Model {
    static associate(models) { 
        UsuarioProfesional.belongsToMany(models.Paciente, {
        through: models.PacienteProfesional,
        foreignKey: 'profesional_id',
        otherKey: 'paciente_id'
        });  
        UsuarioProfesional.hasMany(models.Turno, {
        foreignKey: 'profesional_id'
        });
    }
  }

  UsuarioProfesional.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    contraseña: {
      type: DataTypes.STRING,
      allowNull: false
    },
    dni: {
      type: DataTypes.STRING,
      allowNull: false
    },
    matricula: {
      type: DataTypes.STRING,
      allowNull: false
    },
    titulo: {
      type: DataTypes.STRING,
      allowNull: false
    },
    especialidad: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    sequelize,
    modelName: 'UsuarioProfesional',
    tableName: 'usuario_profesional',
    timestamps: false
  });

  return UsuarioProfesional;
};
