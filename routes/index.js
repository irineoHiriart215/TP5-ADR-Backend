const express = require('express');
const router = express.Router();

const usuarioProfesionalRoutes = require('./usuarioProfesionalRoutes');
const pacienteRoutes = require('./pacientesRoutes');
const turnoRoutes = require('./turnoRoutes');
const obraSocialRoutes = require('./obraSocialRoutes');

router.use('/profesionales', usuarioProfesionalRoutes);
router.use('/pacientes', pacienteRoutes);
router.use('/turnos', turnoRoutes);
router.use('/obras-sociales', obraSocialRoutes);

module.exports = router;
