const express = require('express');
const router = express.Router();
const agentesController = require('../controller/agentesController');

router.get('/agentes', agentesController.getAllAgentes);

router.get('/agentes/:id', agentesController.getAgenteById);

router.post('/agentes', agentesController.createAgente);

router.put('/agentes/:id', agentesController.updateAgente);

router.delete('/agentes/:id', agentesController.deleteAgente);

module.exports = router;
