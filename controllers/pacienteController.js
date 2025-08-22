const { Paciente, ObraSocial } = require('../models');

const create = async (req, res) => {
    const {
        nombre,
        dni,
        fecha_nacimiento,
        telefono,
        email,
        observaciones,
        obra_social_id,
    } = req.body;

    if (!nombre || !dni || !fecha_nacimiento || !telefono || !email || !obra_social_id){
        return res.status(400).json({error: 'Debe completar los campos obligatorios del paciente'});
    }

    if (!Number.isInteger(Number(dni))) {
        return res.status(400).json({ error: 'El DNI debe ser un entero'});
    }
    
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return res.status(400).json({ error: 'Email inválido' });
    }

    try { 
    const obraSocial = await ObraSocial.findByPk(obra_social_id);
    if (!obraSocial) {
      return res.status(404).json({ error: 'La obra social especificada no existe' });
    }

        const nuevo = await Paciente.create(req.body);
        res.status(201).json(nuevo);
    }
    catch (error){
        res.status(500).json({ error: 'Error al crear el paciente'});
    }
};

const getPacientes = async (req, res) => {
    try {
        const pacientes = await Paciente.findAll();
        res.json(pacientes);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getPacienteById = async (req, res) => {
    try {
        const paciente = await Paciente.findByPk(req.params.id);
        if (!paciente) return res.status(404).json({ error: 'Paciente no encontrado'});
        res.json(paciente);
    }
    catch (error) {
        res.status(500).json({ error: 'Error al obtener el paciente'});
    }
};

const actualizar = async (req, res) => {
    try{
        const actualizado = await Paciente.update(req.body, {
            where: { id: req.params.id }
        });
        res.json(actualizado);
    }
    catch(error){
        res.status(400).json({error: 'Error al actualizar el paciente'});
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

const verProfesionalesAsoc = async (req, res ) => {
    try {
        const paciente = await Paciente.findByPk(req.params.id, {
            include: UsuarioProfesional
        });

        if (!paciente) {
            return res.status(404).json({ error: 'Paciente no encontrado'});
        }

        res.json(paciente.UsuarioProfesionales);
    }
    catch (error){
        res.status(500).json({ error: 'Error al obtener los profesionales'})
    }
}

module.exports = { create, getPacientes, getPacienteById, actualizar, asociarProfesional, verProfesionalesAsoc};