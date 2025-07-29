const agentes = [];

function findAll() {
  return agentes;
}

function findById(id) {
  return agentes.find(agente => agente.id === id);
}

function create(agente) {
  agentes.push(agente);
  return agente;
}

function update(id, updatedAgente) {
  const index = agentes.findIndex(agente => agente.id === id);
  if (index !== -1) {
    agentes[index] = { ...agentes[index], ...updatedAgente };
    return agentes[index];
  }
  return null;
}

function remove(id) {
  const index = agentes.findIndex(agente => agente.id === id);
  if (index !== -1) {
    return agentes.splice(index, 1)[0];
  }
  return null;
}

module.exports = {
  findAll,
  findById,
  create,
  update,
  remove
};
