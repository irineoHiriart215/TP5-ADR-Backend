const express = require('express');
const router = express.Router();
const controller = require('../controllers/turnoController');

router.get('/', controller.obtenerTurnos);
router.get('/:id', controller.obtenerTurnoPorId);
router.post('/', controller.crearTurno);
router.put('/:id', controller.actualizarTurno);
router.delete('/:id', controller.eliminarTurno);
router.get('/prof/:profesionalId', controller.obtenerTurnosPorProfesional);

module.exports = router;