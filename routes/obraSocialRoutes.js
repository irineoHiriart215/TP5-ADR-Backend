const express = require('express');
const router = express.Router();
const controller = require('../controllers/obraSocialController');

router.get('/', controller.obtenerObrasSociales);
router.get('/:id', controller.obtenerObraSocialPorId);
router.post('/', controller.crearObraSocial);
router.put('/:id', controller.actualizarObraSocial);
router.delete('/', controller.eliminarObraSocial);

module.exports = router;