
function getAllAgentes(req, res) {
  res.json([{ id: "1", nome: "Agente Teste" }]);
}

function createAgente(req, res) {
  const novoAgente = req.body;
  const agenteCriado = agentesRepository.create(novoAgente);
  res.status(201).json(agenteCriado);
}

function getAgenteById(req, res) {
  const id = req.params.id;
  const agente = agentesRepository.findById(id);

  if (!agente) {
    return res.status(404).json({ mensagem: "Agente não encontrado." });
  }

  res.json(agente);
}

function updateAgente(req, res) {
  const id = req.params.id;
  const dadosAtualizados = req.body;

  const agenteAtualizado = agentesRepository.update(id, dadosAtualizados);
  if (!agenteAtualizado) {
    return res.status(404).json({ mensagem: "Agente não encontrado." });
  }

  res.json(agenteAtualizado);
}

function deleteAgente(req, res) {
  const id = req.params.id;

  const removido = agentesRepository.remove(id);
  if (!removido) {
    return res.status(404).json({ mensagem: "Agente não encontrado." });
  }

  res.status(204).send(); 
}

module.exports = {
  getAllAgentes,
  getAgenteById,
  createAgente,
  updateAgente,
  deleteAgente
};