
// controllers/obraSocialController.js
const { ObraSocial } = require('../models');

const crearObraSocial = async (req, res) => {
    try {
      const nuevaObraSocial = await ObraSocial.create(req.body);
      res.status(201).json(nuevaObraSocial);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

const obtenerObrasSociales = async (req, res) => {
    try {
      const obras = await ObraSocial.findAll();
      res.json(obras);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

const obtenerObraSocialPorId = async (req, res) => {
    try {
      const obra = await ObraSocial.findByPk(req.params.id);
      if (!obra) return res.status(404).json({ error: 'Obra Social no encontrada' });
      res.json(obra);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

const actualizarObraSocial = async (req, res) => {
    try {
      const obra = await ObraSocial.findByPk(req.params.id);
      if (!obra) return res.status(404).json({ error: 'Obra Social no encontrada' });

      await obra.update(req.body);
      res.json(obra);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

const eliminarObraSocial = async (req, res) => {
    try {
      const obra = await ObraSocial.findByPk(req.params.id);
      if (!obra) return res.status(404).json({ error: 'Obra Social no encontrada' });

      await obra.destroy();
      res.json({ mensaje: 'Obra Social eliminada correctamente' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  module.exports = { crearObraSocial, obtenerObraSocialPorId, obtenerObrasSociales, actualizarObraSocial, eliminarObraSocial};
