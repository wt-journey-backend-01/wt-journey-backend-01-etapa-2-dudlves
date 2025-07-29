const agentesRepository = require('../repositories/agentesRepository');
const { v4: uuidv4 } = require('uuid');

function getAllAgentes(req, res) {
  const agentes = agentesRepository.findAll();
  res.json(agentes);
}

function getAgenteById(req, res) {
  const { id } = req.params;
  const agente = agentesRepository.findById(id);
  if (!agente) {
    return res.status(404).json({ message: "Agente não encontrado" });
  }
  res.json(agente);
}

function createAgente(req, res) {
  const { nome, dataDeIncorporacao, cargo } = req.body;
  if (!nome || !dataDeIncorporacao || !cargo) {
    return res.status(400).json({ message: "Campos obrigatórios faltando" });
  }
  const newAgente = {
    id: uuidv4(),
    nome,
    dataDeIncorporacao,
    cargo,
  };
  agentesRepository.create(newAgente);
  res.status(201).json(newAgente);
}

function updateAgente(req, res) {
  const { id } = req.params;
  const { nome, dataDeIncorporacao, cargo } = req.body;
  const agente = agentesRepository.findById(id);
  if (!agente) {
    return res.status(404).json({ message: "Agente não encontrado" });
  }
  if (!nome || !dataDeIncorporacao || !cargo) {
    return res.status(400).json({ message: "Campos obrigatórios faltando" });
  }
  const updatedAgente = { id, nome, dataDeIncorporacao, cargo };
  agentesRepository.update(updatedAgente);
  res.json(updatedAgente);
}

function deleteAgente(req, res) {
  const { id } = req.params;
  const agente = agentesRepository.findById(id);
  if (!agente) {
    return res.status(404).json({ message: "Agente não encontrado" });
  }
  agentesRepository.remove(id);
  res.status(204).send();
}

module.exports = {
  getAllAgentes,
  getAgenteById,
  createAgente,
  updateAgente,
  deleteAgente,
};
