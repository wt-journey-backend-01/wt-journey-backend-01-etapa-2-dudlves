let agentes = [];

exports.getAll = () => agentes;

exports.getById = (id) => agentes.find(a => a.id === id);

exports.add = (agente) => {
  agentes.push(agente);
  return agente;
};

exports.update = (id, newData) => {
  const index = agentes.findIndex(a => a.id === id);
  if (index === -1) return null;
  agentes[index] = { ...agentes[index], ...newData };
  return agentes[index];
};

exports.remove = (id) => {
  const initialLength = agentes.length;
  agentes = agentes.filter(a => a.id !== id);
  return agentes.length < initialLength;
};
