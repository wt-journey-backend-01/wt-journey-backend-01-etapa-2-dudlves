const casos = [];

function findAll() {
  return casos;
}

function findById(id) {
  return casos.find(caso => caso.id === id);
}

function create(caso) {
  casos.push(caso);
  return caso;
}

function update(id, updatedCaso) {
  const index = casos.findIndex(caso => caso.id === id);
  if (index !== -1) {
    casos[index] = { ...casos[index], ...updatedCaso };
    return casos[index];
  }
  return null;
}

function remove(id) {
  const index = casos.findIndex(caso => caso.id === id);
  if (index !== -1) {
    return casos.splice(index, 1)[0];
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
