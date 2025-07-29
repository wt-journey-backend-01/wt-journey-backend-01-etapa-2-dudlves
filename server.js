const express = require('express');
const app = express();
const PORT = 3000;

const agentesRouter = require('./routes/agentesRoutes');
const casosRoutes = require('./routes/casosRoutes');
const setupSwagger = require('./docs/swagger');
const errorHandler = require('./utils/errorHandler');

app.use(express.json());
app.use('/agentes', agentesRouter);
app.use('/casos', casosRoutes);

setupSwagger(app);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Servidor do Departamento de Polícia rodando em http://localhost:${PORT}`);
  console.log(`Documentação disponível em http://localhost:${PORT}/api-docs`);
});

