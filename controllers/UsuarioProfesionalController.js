const {UsuarioProfesional} = require('../models');
const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');

//Obtener todos los profesionales.
const getAllProfesionales = async (req, res) => {
    try {
        const profesionales = await UsuarioProfesional.findAll();
        res.json(profesionales);
    }
    catch (error) {
        res.status(500).json({ error: "Error al obtener los profesionales"});
    }
};

//Obtener un profesional por Id.
const getProfesional = async (req, res) => {
    try {
        const profesional = await UsuarioProfesional.findByPk(req.params.id);
        if (!profesional) return res.status(404).json({ error: 'No encontrado.'});
        res.json(profesional);
    }
    catch (error){
        res.status(500).json({ error: 'Error al obtener el profesional'});
    }
};

//Crear un profesional.
const crear = async (req, res) => {
    try {
        const { nombre, email, contraseña, dni, matricula, titulo } = req.body;
         
        if (!nombre || !email || !contraseña || !dni || !matricula || !titulo){
            return res.status(400).json({ error: 'Debe ingresar los campos obligatorios'});
        }

        if (contraseña.length < 8){
            return res.status(400).json({error: 'La contraseña debe tener como minimo 8 caracteres'});
        }

        if (!Number.isInteger(Number(dni))) {
            return res.status(400).json({ error: 'el DNI debe ser un numero'})
        }

        if (!Number.isInteger(Number(matricula))) {
            return res.status(400).json({ error: 'La matricula debe ser un numero'})
        }

        const dniExistente = await UsuarioProfesional.findOne({ where: {dni}});
        if (dniExistente){
            return res.status(400).json({ error: 'DNI ya registrado' });
        }
        const emailExistente = await UsuarioProfesional.findOne({ where: {email}});
        if (emailExistente){
            return res.status(400).json({ error: 'Email ya registrado' });
        }

        const hash = await bcrypt.hash(contraseña, 10);
        const nuevo = await UsuarioProfesional.create({...req.body, contraseña: hash});
        res.status(201).json(nuevo);
    }
    catch (error) {
        res.status(500).json({ error: 'Error al crear el profesional'})
    }
}

//Actualizar un profesional.
const actualizar = async (req, res) => {
    try {
        const actualizado = await UsuarioProfesional.update(req.body,{
            where: { id: req.params.id }
        })
        res.json(actualizado)
    }
    catch (error) {
        res.status(500).json({ error: 'Error al actualizar el profesional'})
    }
};


const asociarProfesional = async (req, res) => {
  try {
    const paciente = await Paciente.findByPk(req.params.pacienteId);
    const profesional = await UsuarioProfesional.findByPk(req.body.profesionalId);

    if (!paciente || !profesional) {
      return res.status(404).json({ error: 'Paciente o Profesional no encontrado' });
    }

    await paciente.addUsuarioProfesional(profesional);
    res.json({ mensaje: 'Asociación creada correctamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}


const ObtenerPacientesProfesional = async (req, res) => {
    try {
        const profesional = await UsuarioProfesional.findByPk(req.params.id, {
            include: Paciente
        });
        if (!profesional){
            return res.status(404).json({ error: 'Profesional no encontrado'});
        };
        res.json(profesional.Pacientes);
    }
    catch (error) {
        res.status(500).json({ error: 'Error al obtener los pacientes'})
    }
};

module.exports = { getAllProfesionales, getProfesional, crear, actualizar, ObtenerPacientesProfesional };