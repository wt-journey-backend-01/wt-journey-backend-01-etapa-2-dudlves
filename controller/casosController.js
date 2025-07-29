const casosRepository = require('../repositories/casosRepository');
const { v4: uuidv4 } = require('uuid');

function getAllCasos(req, res) {
  const casos = casosRepository.findAll();
  res.json(casos);
}

function getCasoById(req, res) {
  const { id } = req.params;
  const caso = casosRepository.findById(id);
  if (!caso) {
    return res.status(404).json({ message: "Caso não encontrado" });
  }
  res.json(caso);
}

function createCaso(req, res) {
  const { titulo, descricao, status, agente_id } = req.body;
  if (!titulo || !descricao || !status || !agente_id) {
    return res.status(400).json({ message: "Campos obrigatórios faltando" });
  }
  if (!['aberto', 'solucionado'].includes(status)) {
    return res.status(400).json({ message: "Status inválido" });
  }
  const newCaso = {
    id: uuidv4(),
    titulo,
    descricao,
    status,
    agente_id,
  };
  casosRepository.create(newCaso);
  res.status(201).json(newCaso);
}

function updateCaso(req, res) {
  const { id } = req.params;
  const { titulo, descricao, status, agente_id } = req.body;
  const caso = casosRepository.findById(id);
  if (!caso) {
    return res.status(404).json({ message: "Caso não encontrado" });
  }
  if (!titulo || !descricao || !status || !agente_id) {
    return res.status(400).json({ message: "Campos obrigatórios faltando" });
  }
  if (!['aberto', 'solucionado'].includes(status)) {
    return res.status(400).json({ message: "Status inválido" });
  }
  const updatedCaso = { id, titulo, descricao, status, agente_id };
  casosRepository.update(updatedCaso);
  res.json(updatedCaso);
}

function deleteCaso(req, res) {
  const { id } = req.params;
  const caso = casosRepository.findById(id);
  if (!caso) {
    return res.status(404).json({ message: "Caso não encontrado" });
  }
  casosRepository.remove(id);
  res.status(204).send();
}

module.exports = {
  getAllCasos,
  getCasoById,
  createCaso,
  updateCaso,
  deleteCaso,
};
