const { Turno, Paciente, UsuarioProfesional } = require('../models');


const crearTurno =  async (req, res) => {
  const { fecha, hora, motivo, tipo, paciente_id, profesional_id } = req.body;
    if (!fecha || !hora || !motivo || !tipo || !paciente_id || !profesional_id) {
      return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }
    
    if (!['consultorio', 'domicilio'].includes(tipo)) {
      return res.status(400).json({ error: 'Tipo de turno inválido' });
    }

    const fechaHora = new Date(`${fecha}T${hora}`);
      
      if (isNaN(fechaHora.getTime())) {
        return res.status(400).json({ error: "Fecha y hora incorrectas" });
      }

    try {
      const paciente = await Paciente.findByPk(paciente_id);
      const profesional = await UsuarioProfesional.findByPk(profesional_id);
      if (!paciente || !profesional) {
        return res.status(404).json({ error: 'Paciente o Profesional no encontrado' });
      }

      const nuevoTurno = await Turno.create({...req.body, fecha_hora: fechaHora});
      res.status(201).json(nuevoTurno);
    } catch (error) {
      res.status(500).json({ error: "Error al crear el turno"+`${fecha_hora}` });
    }
  };

const obtenerTurnos = async (req, res) => {
    try {
      const turnos = await Turno.findAll({
        include: [Paciente, UsuarioProfesional]
      });
      res.json(turnos);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

const obtenerTurnoPorId = async (req, res) => {
    try {
      const turno = await Turno.findByPk(req.params.id, {
        include: [Paciente, UsuarioProfesional]
      });
      if (!turno) return res.status(404).json({ error: 'Turno no encontrado' });
      res.json(turno);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

const actualizarTurno = async (req, res) => {
    try {
      const turno = await Turno.findByPk(req.params.id);
      if (!turno) return res.status(404).json({ error: 'Turno no encontrado' });

      await turno.update(req.body);
      res.json(turno);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

const eliminarTurno = async (req, res) => {
    try {
      const turno = await Turno.findByPk(req.params.id);
      if (!turno) return res.status(404).json({ error: 'Turno no encontrado' });

      await turno.destroy();
      res.json({ mensaje: 'Turno eliminado correctamente' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

const obtenerTurnosPorProfesional = async (req, res) => {
  const profesional_id = req.params.profesionalId;
  if (!profesional_id) {
    return res.status(400).json({ error: 'Falta el ID del profesional' });
  }

  try {
    const turnos = await Turno.findAll({
      where: { profesional_id },
      include: [Paciente],
      order: [['fecha_hora', 'ASC']],
    });
    res.json(turnos);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los turnos' });
  }
};

module.exports = {crearTurno, obtenerTurnos, obtenerTurnoPorId, actualizarTurno, eliminarTurno, obtenerTurnosPorProfesional }