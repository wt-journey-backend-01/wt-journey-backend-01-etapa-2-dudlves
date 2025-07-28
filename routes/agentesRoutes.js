const express = require('express');
const router = express.Router();

router.get('/agentes', (req, res) => {
  res.json([{ id: "1", nome: "Agente Teste" }]);
});

module.exports = router;