const { v4: uuidv4 } = require('uuid');
const casosRepository = require('../repository/casosRepository');

exports.getAllCasos = (req, res) => {
  res.json(casosRepository.getAll());
};

exports.getCasoById = (req, res) => {
  const caso = casosRepository.getById(req.params.id);
  if (!caso) return res.status(404).json({ error: 'Caso não encontrado' });
  res.json(caso);
};

exports.createCaso = (req, res) => {
  const { titulo, descricao } = req.body;
  const novoCaso = { id: uuidv4(), titulo, descricao };
  casosRepository.add(novoCaso);
  res.status(201).json(novoCaso);
};

exports.updateCaso = (req, res) => {
  const { titulo, descricao } = req.body;
  const updated = casosRepository.update(req.params.id, { titulo, descricao });
  if (!updated) return res.status(404).json({ error: 'Caso não encontrado' });
  res.json(updated);
};

exports.deleteCaso = (req, res) => {
  const success = casosRepository.remove(req.params.id);
  if (!success) return res.status(404).json({ error: 'Caso não encontrado' });
  res.status(204).end();
};
