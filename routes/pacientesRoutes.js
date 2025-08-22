const express = require('express');
const router = express.Router();
const controller = require('../controllers/pacienteController');

router.get('/', controller.getPacientes);
router.get('/:id', controller.getPacienteById);
router.post('/', controller.create);
router.put('/:id', controller.actualizar);
router.post('/:id/asociar-profesional', controller.asociarProfesional);
router.post('/:id/profesionales', controller.verProfesionalesAsoc);

module.exports = router;