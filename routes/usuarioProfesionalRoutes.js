const express = require('express');
const router = express.Router();
const controller = require('../controllers/UsuarioProfesionalController');

router.get('/', controller.getAllProfesionales);
router.get('/:id', controller.getProfesional);
router.post('/', controller.crear);
router.put('/:id', controller.actualizar);
router.get('/:id/pacientes', controller.ObtenerPacientesProfesional);
router.post('/:profesionalId/pacientes', controller.asociarPaciente);

module.exports = router;