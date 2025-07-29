const casos = [];

function findAll() {
  return casos;
}

function findById(id) {
  return casos.find(caso => caso.id === id);
}

function create(caso) {
  casos.push(caso);
}

function update(updatedCaso) {
  const index = casos.findIndex(c => c.id === updatedCaso.id);
  if (index !== -1) {
    casos[index] = updatedCaso;
  }
}

function remove(id) {
  const index = casos.findIndex(c => c.id === id);
  if (index !== -1) {
    casos.splice(index, 1);
  }
}

module.exports = {
  findAll,
  findById,
  create,
  update,
  remove,

};