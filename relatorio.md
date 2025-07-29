<sup>Esse é um feedback gerado por IA, ele pode conter erros.</sup>

Você tem 7 créditos restantes para usar o sistema de feedback AI.

# Feedback para dudlves:

Nota final: **50.4/100**

# Feedback do seu desafio API REST - Departamento de Polícia 🚓🚀

Olá, dudlves! Tudo bem? 😊 Antes de mais nada, parabéns pelo esforço e por ter avançado bastante nesse desafio importante de construir uma API RESTful completa com Node.js e Express! 🎉 Você já tem uma base muito boa, e vamos juntos lapidar seu código para deixá-lo ainda mais robusto e alinhado com as boas práticas.

---

## 🎯 O que você mandou muito bem

- **Estruturação das rotas:** Seu `server.js` está configurado corretamente para usar as rotas de agentes e casos, e você organizou as rotas em arquivos separados (`routes/agentesRoutes.js` e `routes/casosRoutes.js`). Isso é ótimo, pois facilita a manutenção e escalabilidade.  
- **Uso dos repositories:** Você implementou os repositórios para agentes e casos (`repositories/agentesRepository.js` e `repositories/casosRepository.js`) com as funções básicas de CRUD usando arrays em memória. Isso é exatamente o que o desafio pedia para armazenar os dados temporariamente.  
- **Swagger para documentação:** A inclusão do Swagger é um diferencial muito bacana! Isso mostra que você pensou na documentação da API, o que é essencial para APIs profissionais.  
- **Status codes corretos em várias operações:** Vi que você já está retornando status 400 para payloads incorretos e 404 para recursos não encontrados, o que é fundamental para uma API RESTful bem construída!  
- **Implementação dos métodos PUT para atualização completa:** Você já tem o PUT funcionando para atualizar agentes e casos, o que é um passo importante para o controle total dos recursos.  
- **Criação e leitura funcionando:** Os endpoints para criar e listar agentes e casos estão funcionando bem, o que é a base para qualquer API.  

Além disso, você já começou a trabalhar nos bônus, como filtros e ordenação, o que é super legal! 🎖️ Isso mostra que você está buscando ir além do básico.

---

## 🔎 Pontos que merecem sua atenção para melhorar (vamos destrinchar juntos)

### 1. **Ausência dos controllers para agentes e casos**

Ao analisar seu projeto, percebi que os arquivos `controllers/agentesController.js` e `controllers/casosController.js` **não existem**. Isso é um ponto crucial!  

Por quê?  
As rotas (`routes/agentesRoutes.js` e `routes/casosRoutes.js`) estão configuradas para chamar funções do controller, como `agentesController.getAllAgentes` ou `casosController.createCaso`, mas sem esses arquivos e funções implementadas, seu servidor não sabe o que fazer quando essas rotas forem acessadas.  

Isso explica porque várias operações importantes, como PATCH (atualização parcial) e DELETE, não funcionam – porque os controladores que deveriam orquestrar essas ações não estão implementados.  

**Como corrigir?**  
Crie os arquivos `controllers/agentesController.js` e `controllers/casosController.js` e implemente as funções que suas rotas estão esperando. Por exemplo, no `agentesController.js`:

```js
const agentesRepository = require('../repositories/agentesRepository');

function getAllAgentes(req, res) {
  const agentes = agentesRepository.findAll();
  res.status(200).json(agentes);
}

function getAgenteById(req, res) {
  const { id } = req.params;
  const agente = agentesRepository.findById(id);
  if (!agente) {
    return res.status(404).json({ error: 'Agente não encontrado' });
  }
  res.status(200).json(agente);
}

// Continue implementando createAgente, updateAgente, patchAgente, deleteAgente

module.exports = {
  getAllAgentes,
  getAgenteById,
  // exporte as outras funções aqui
};
```

Esse padrão deve ser repetido para os casos também.

👉 Recomendo fortemente que você assista a este vídeo para entender como organizar rotas, controllers e repositories no Express.js:  
https://youtu.be/bGN_xNc4A1k?si=Nj38J_8RpgsdQ-QH

---

### 2. **Falta do método PATCH para atualização parcial**

Vi que seu código implementa o método PUT para atualização completa (`router.put('/:id', ...)`), mas não há nenhuma rota ou controller para o método PATCH, que é importante para atualizações parciais.  

O método PATCH é diferente do PUT porque ele atualiza apenas os campos que o cliente enviar, sem sobrescrever tudo. Isso é um requisito esperado no seu desafio e está faltando.  

**Como implementar?**  
No arquivo `routes/agentesRoutes.js` e `routes/casosRoutes.js`, adicione:

```js
router.patch('/:id', agentesController.patchAgente);
```

E no controller, crie a função `patchAgente` que atualiza parcialmente o agente, validando os dados recebidos e retornando status apropriados.

---

### 3. **Validações insuficientes e problemas com campos específicos**

Seu código permite algumas situações que não deveriam acontecer, como:

- Registrar um agente com `dataDeIncorporacao` em formato inválido ou no futuro.  
- Atualizar o ID do agente ou do caso (que deve ser imutável).  
- Atualizar o status do caso para valores que não são `'aberto'` ou `'solucionado'`.  

Esses pontos são importantes para garantir a integridade dos dados da sua API.

**Como melhorar?**  
No controller, antes de criar ou atualizar um recurso, valide os dados do payload. Por exemplo, para validar `dataDeIncorporacao`:

```js
function isValidDate(dateString) {
  // Verifica se está no formato YYYY-MM-DD e se não é uma data futura
  const regex = /^\d{4}-\d{2}-\d{2}$/;
  if (!regex.test(dateString)) return false;
  const date = new Date(dateString);
  const now = new Date();
  return date <= now;
}
```

E ao atualizar, bloqueie mudanças no campo `id`:

```js
if (updatedAgente.id && updatedAgente.id !== id) {
  return res.status(400).json({ error: 'Não é permitido alterar o ID do agente.' });
}
```

Para o `status` do caso, valide se o valor está entre os permitidos:

```js
const validStatus = ['aberto', 'solucionado'];
if (updatedCaso.status && !validStatus.includes(updatedCaso.status)) {
  return res.status(400).json({ error: 'Status inválido. Deve ser "aberto" ou "solucionado".' });
}
```

Essas validações devem estar presentes tanto na criação quanto na atualização (PUT e PATCH).

Para aprender mais sobre validação e tratamento de erros, veja:  
https://youtu.be/yNDCRAz7CM8?si=Lh5u3j27j_a4w3A_  
https://developer.mozilla.org/pt-BR/docs/Web/HTTP/Status/400

---

### 4. **Estrutura de diretórios e nomes de pastas**

Na sua estrutura, notei que você tem uma pasta chamada `controller` (no singular), mas o esperado é `controllers` (plural), conforme o padrão do desafio e da comunidade. Isso pode causar confusão e até erros ao importar os arquivos, além de fugir da arquitetura MVC que você está tentando seguir.  

**Sugestão:** Renomeie a pasta para `controllers` e garanta que os arquivos `agentesController.js` e `casosController.js` estejam dentro dela.  

Assim:

```
├── controllers/
│   ├── agentesController.js
│   └── casosController.js
```

Esse detalhe é importante para manter seu projeto organizado e facilitar a manutenção.  

Para entender melhor a arquitetura MVC aplicada em Node.js, recomendo:  
https://youtu.be/bGN_xNc4A1k?si=Nj38J_8RpgsdQ-QH

---

### 5. **Filtros, ordenação e mensagens de erro customizadas (Bônus)**

Você já começou a implementar filtros e ordenação, o que é ótimo! Porém, percebi que os filtros não estão funcionando corretamente e as mensagens de erro ainda são genéricas.  

Para melhorar, implemente query params para filtrar, por exemplo, casos por status:

```js
router.get('/', (req, res) => {
  const { status } = req.query;
  let resultados = casosRepository.findAll();
  if (status) {
    resultados = resultados.filter(caso => caso.status === status);
  }
  res.json(resultados);
});
```

E crie mensagens de erro personalizadas para facilitar o entendimento do usuário da API.  

Quer aprender mais sobre isso? Veja:  
https://developer.mozilla.org/pt-BR/docs/Web/HTTP/Status/404  
https://developer.mozilla.org/pt-BR/docs/Web/HTTP/Status/400

---

## 💡 Dicas extras para você arrasar na próxima versão

- Sempre que criar ou atualizar um recurso, valide todos os campos obrigatórios e seus formatos.  
- Separe bem a lógica da rota, do controller e do repository para que seu código fique limpo e fácil de testar.  
- Implemente o método PATCH para atualizações parciais, isso é um diferencial e ajuda muito na usabilidade da API.  
- Não permita alterações nos campos que não devem ser alterados, como o `id` dos agentes e casos.  
- Use mensagens de erro claras e status HTTP corretos para cada situação.  

---

## 📌 Resumo rápido dos pontos para focar

- [ ] Criar e implementar os arquivos `controllers/agentesController.js` e `controllers/casosController.js` com todas as funções esperadas.  
- [ ] Implementar o método PATCH para atualização parcial nos controllers e rotas.  
- [ ] Adicionar validações rigorosas para campos como `dataDeIncorporacao`, `status` do caso, e impedir alteração do `id`.  
- [ ] Corrigir a estrutura de pastas para usar `controllers` (plural) ao invés de `controller`.  
- [ ] Aprimorar filtros e ordenação, e criar mensagens de erro personalizadas para melhorar a experiência da API.  

---

## 🚀 Conclusão

Você está no caminho certo, dudlves! Seu projeto já tem uma base sólida e com alguns ajustes importantes vai ficar bem alinhado com as melhores práticas de desenvolvimento de APIs RESTful. Não desanime com as dificuldades, pois elas são ótimas oportunidades para aprender e crescer.  

Continue explorando, validando seus dados e organizando seu código com clareza. Se precisar, volte aos recursos que recomendei aqui para reforçar seu aprendizado. Estou aqui torcendo pela sua evolução e sucesso! 💪✨

---

Se quiser, posso ajudar a montar juntos os controllers ou revisar seu código para que fique redondinho! Só chamar! 😉

Abraços e até a próxima! 👊👨‍💻👩‍💻

---

# Recursos recomendados para você:

- [Arquitetura MVC em Node.js - Organização de Código](https://youtu.be/bGN_xNc4A1k?si=Nj38J_8RpgsdQ-QH)  
- [Validação de Dados em APIs Node.js/Express](https://youtu.be/yNDCRAz7CM8?si=Lh5u3j27j_a4w3A_)  
- [Status HTTP 400 - Bad Request (MDN)](https://developer.mozilla.org/pt-BR/docs/Web/HTTP/Status/400)  
- [Status HTTP 404 - Not Found (MDN)](https://developer.mozilla.org/pt-BR/docs/Web/HTTP/Status/404)  
- [Express.js Routing - Documentação Oficial](https://expressjs.com/pt-br/guide/routing.html)  
- [Manipulação de Arrays em JavaScript](https://youtu.be/glSgUKA5LjE?si=t9G2NsC8InYAU9cI)  

---

Vamos juntos construir uma API cada vez mais profissional! 🚀🌟

> Caso queira tirar uma dúvida específica, entre em contato com o Chapter no nosso [discord](https://discord.gg/DryuHVnz).



---
<sup>Made By the Autograder Team.</sup><br>&nbsp;&nbsp;&nbsp;&nbsp;<sup><sup>- [Arthur Carvalho](https://github.com/ArthurCRodrigues)</sup></sup><br>&nbsp;&nbsp;&nbsp;&nbsp;<sup><sup>- [Arthur Drumond](https://github.com/drumondpucminas)</sup></sup><br>&nbsp;&nbsp;&nbsp;&nbsp;<sup><sup>- [Gabriel Resende](https://github.com/gnvr29)</sup></sup>