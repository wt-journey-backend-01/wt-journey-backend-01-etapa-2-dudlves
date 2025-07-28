const express = require('express');
const router = express.Router();

const {
  getAllCasos,
  getCasoById,
  createCaso,
  updateCaso,
  deleteCaso
} = require('../controller/casosController');


router.get('/', (req, res) => {
  res.json(getAllCasos());
});


router.get('/:id', (req, res) => {
  const caso = getCasoById(req.params.id);
  if (caso) {
    res.json(caso);
  } else {
    res.status(404).json({ mensagem: "Caso não encontrado" });
  }
});


router.post('/', (req, res) => {
  const novoCaso = createCaso(req.body);
  res.status(201).json(novoCaso);
});


router.put('/:id', (req, res) => {
  const atualizado = updateCaso(req.params.id, req.body);
  if (atualizado) {
    res.json(atualizado);
  } else {
    res.status(404).json({ mensagem: "Caso não encontrado" });
  }
});


router.delete('/:id', (req, res) => {
  const deletado = deleteCaso(req.params.id);
  if (deletado) {
    res.json(deletado);
  } else {
    res.status(404).json({ mensagem: "Caso não encontrado" });
  }
});

module.exports = router;
