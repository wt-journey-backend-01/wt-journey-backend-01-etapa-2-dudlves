const express = require('express');
const app = express();
const PORT = 3000;

const agentesRouter = require('./routes/agentesRoutes');

app.use(express.json());
app.use(agentesRouter);

app.listen(PORT, () => {
  console.log(`Servidor do Departamento de Polícia rodando em http://localhost:${PORT}`);
});