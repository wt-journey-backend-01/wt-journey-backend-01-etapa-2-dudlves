const express = require('express');
const router = express.Router();
const agentesController = require('../controller/agentesController');

router.get('/agentes', agentesController.getAllAgentes);

module.exports = router;