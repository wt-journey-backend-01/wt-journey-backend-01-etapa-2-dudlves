let casos = [];

exports.getAll = () => casos;

exports.getById = (id) => casos.find(c => c.id === id);

exports.add = (caso) => {
  casos.push(caso);
  return caso;
};

exports.update = (id, newData) => {
  const index = casos.findIndex(c => c.id === id);
  if (index === -1) return null;
  casos[index] = { ...casos[index], ...newData };
  return casos[index];
};

exports.remove = (id) => {
  const initialLength = casos.length;
  casos = casos.filter(c => c.id !== id);
  return casos.length < initialLength;
};
