const { v4: uuidv4 } = require('uuid');
const agentesRepository = require('../repository/agentesRepository');

exports.getAllAgentes = (req, res) => {
  res.json(agentesRepository.getAll());
};

exports.getAgenteById = (req, res) => {
  const agente = agentesRepository.getById(req.params.id);
  if (!agente) return res.status(404).json({ error: 'Agente não encontrado' });
  res.json(agente);
};

exports.createAgente = (req, res) => {
  const { nome, especialidade } = req.body;
  const novoAgente = { id: uuidv4(), nome, especialidade };
  agentesRepository.add(novoAgente);
  res.status(201).json(novoAgente);
};

exports.updateAgente = (req, res) => {
  const { nome, especialidade } = req.body;
  const updated = agentesRepository.update(req.params.id, { nome, especialidade });
  if (!updated) return res.status(404).json({ error: 'Agente não encontrado' });
  res.json(updated);
};

exports.deleteAgente = (req, res) => {
  const success = agentesRepository.remove(req.params.id);
  if (!success) return res.status(404).json({ error: 'Agente não encontrado' });
  res.status(204).end();
};
