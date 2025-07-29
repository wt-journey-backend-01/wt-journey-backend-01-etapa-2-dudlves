const { v4: uuidv4 } = require('uuid');
const agentesRepository = require('../repositories/agentesRepository');

const getAllAgentes = (req, res) => {
  const agentes = agentesRepository.findAll();
  res.json(agentes);
};

const getAgenteById = (req, res) => {
  const agente = agentesRepository.findById(req.params.id);
  if (!agente) return res.status(404).json({ error: 'Agente não encontrado' });
  res.json(agente);
};

const createAgente = (req, res) => {
  const { nome, dataDeIncorporacao, cargo } = req.body;
  if (!nome || !dataDeIncorporacao || !cargo) {
    return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
  }
  const novoAgente = {
    id: uuidv4(),
    nome,
    dataDeIncorporacao,
    cargo,
  };
  agentesRepository.create(novoAgente);
  res.status(201).json(novoAgente);
};

const updateAgente = (req, res) => {
  const { id } = req.params;
  const dados = req.body;
  const atualizado = agentesRepository.update(id, dados);
  if (!atualizado) return res.status(404).json({ error: 'Agente não encontrado' });
  res.json(atualizado);
};

const deleteAgente = (req, res) => {
  const { id } = req.params;
  const deletado = agentesRepository.deleteById(id);
  if (!deletado) return res.status(404).json({ error: 'Agente não encontrado' });
  res.status(204).send();
};

module.exports = {
  getAllAgentes,
  getAgenteById,
  createAgente,
  updateAgente,
  deleteAgente,
};
