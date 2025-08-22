const express = require('express');
const router = express.Router();
const verificarToken = require('../middlewares/verificarToken');

const usuarioProfesionalRoutes = require('./usuarioProfesionalRoutes');
const pacienteRoutes = require('./pacientesRoutes');
const turnoRoutes = require('./turnoRoutes');
const obraSocialRoutes = require('./obraSocialRoutes');

router.use('/profesionales', usuarioProfesionalRoutes);
router.use('/pacientes',verificarToken, pacienteRoutes);
router.use('/turnos',verificarToken, turnoRoutes);
router.use('/obras-sociales', verificarToken, obraSocialRoutes);

module.exports = router;
