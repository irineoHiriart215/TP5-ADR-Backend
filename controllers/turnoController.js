
// controllers/turnoController.js
const { Turno, Paciente, UsuarioProfesional } = require('../models');


const crearTurno =  async (req, res) => {
    try {
      const nuevoTurno = await Turno.create(req.body);
      res.status(201).json(nuevoTurno);
    } catch (error) {
      res.status(400).json({ error: error.message });
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
  }

module.exports = {crearTurno, obtenerTurnos, obtenerTurnoPorId, actualizarTurno, eliminarTurno }