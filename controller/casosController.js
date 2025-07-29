const { v4: uuidv4 } = require('uuid');
const casosRepository = require('../repositories/casosRepository');
const agentesRepository = require('../repositories/agentesRepository');

const getAllCasos = (req, res) => {
  const casos = casosRepository.findAll();
  res.json(casos);
};

const getCasoById = (req, res) => {
  const caso = casosRepository.findById(req.params.id);
  if (!caso) return res.status(404).json({ error: 'Caso não encontrado' });
  res.json(caso);
};

const createCaso = (req, res) => {
  const { titulo, descricao, status, agente_id } = req.body;
  if (!titulo || !descricao || !status || !agente_id) {
    return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
  }

  const agenteExiste = agentesRepository.findById(agente_id);
  if (!agenteExiste) {
    return res.status(404).json({ error: 'Agente vinculado não encontrado' });
  }

  const novoCaso = {
    id: uuidv4(),
    titulo,
    descricao,
    status,
    agente_id,
  };
  casosRepository.create(novoCaso);
  res.status(201).json(novoCaso);
};

const updateCaso = (req, res) => {
  const { id } = req.params;
  const atualizado = casosRepository.update(id, req.body);
  if (!atualizado) return res.status(404).json({ error: 'Caso não encontrado' });
  res.json(atualizado);
};

const deleteCaso = (req, res) => {
  const deletado = casosRepository.deleteById(req.params.id);
  if (!deletado) return res.status(404).json({ error: 'Caso não encontrado' });
  res.status(204).send();
};

module.exports = {
  getAllCasos,
  getCasoById,
  createCaso,
  updateCaso,
  deleteCaso,
};
