function getAllAgentes(req, res) {
  res.json([{ id: "1", nome: "Agente Teste" }]);
}

module.exports = {
  getAllAgentes
};