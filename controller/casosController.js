let casos = [];

function getAllCasos() {
  return casos;
}

function getCasoById(id) {
  return casos.find(caso => caso.id === id);
}

function createCaso(caso) {
  casos.push(caso);
  return caso;
}

function updateCaso(id, dadosAtualizados) {
  const index = casos.findIndex(caso => caso.id === id);
  if (index !== -1) {
    casos[index] = { ...casos[index], ...dadosAtualizados };
    return casos[index];
  }
  return null;
}

function deleteCaso(id) {
  const index = casos.findIndex(caso => caso.id === id);
  if (index !== -1) {
    return casos.splice(index, 1)[0];
  }
  return null;
}

module.exports = {
  getAllCasos,
  getCasoById,
  createCaso,
  updateCaso,
  deleteCaso
};
