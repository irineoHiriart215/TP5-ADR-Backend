const express = require('express');
const router = express.Router();
const controller = require('../controllers/UsuarioProfesionalController');
const verificarToken = require('../middlewares/verificarToken');


router.get('/', verificarToken, controller.getAllProfesionales);
router.get('/:id', verificarToken, controller.getProfesional);
router.post('/', controller.crear);
router.put('/:id', verificarToken, controller.actualizar);
router.get('/:id/pacientes', verificarToken, controller.ObtenerPacientesProfesional);
router.post('/:profesionalId/pacientes', verificarToken, controller.asociarPaciente);
router.post('/login', controller.login);

module.exports = router;