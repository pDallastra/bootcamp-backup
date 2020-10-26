const express = require('express');
const { uuid } = require('uuidv4');
const cors = require('cors');

const app = express();
app.use(cors());

app.use(express.json());


 /**
  * Middleware:
  * 
  * Interceptador de requisições
  *     Pode interromper ou alterar dados da requisição.
  * 
  * Geralmente usar quando algum trecho de código que pode se repetir em diferentes requests
  */

 function logRequests(req, res, next) {
    const {method, url} = req;

    const logLabel = `[${method.toUpperCase()}] ${url}`;

    console.log(logLabel);

    return next();
  }

  app.use(logRequests);
  
/**
 * Métodos HTTP:
 * 
 * GET - Buscar informações / Dados
 * 
 * POST - Criar uma informação no Backend
 * 
 * PUT/PATCH - Alterar/Editar uma informação no backend 
 * (PUT - varias | PATCH - informação específica)
 * 
 * DELETE - Deletar informação no backend
 */


const projects = [];

app.get('/projects', (req, res) => {
    const {title, owner} = req.query;
    console.log(title);
    console.log(owner);

    console.log(req.body)
    //Código antes da aplicação funcional
    // return res.json([
    //     'Project 01',
    //     'Project 02',
    // ])

    //Filtrando para encontrar objecto especifico (filtro)
    /**
     * const {title} = req.query;
     * const results = title ? projects.filter(project => project.title.includes(title)) : projects;
     * return res.json(results);
     */

    return res.json(projects);
});

app.post('/projects', (req, res) => {
    //Iniciando Aplicacao Funcional (modulo 1)
    const {title, name} = req.body;

    const project = { id: uuid(), title, name}

    projects.push(project)
    return res.json(project)
});

app.put('/projects/:id', (req, res) => {
    const {id} = req.params;
    const {title, name} = req.body;

    const projectIndex = projects.findIndex(project => project.id === id);

    if(projectIndex < 0) {
        return res.status(404).json({ error: 'Project not found'})
    }

    const project = {
        id,
        title,
        name
    }

    projects[projectIndex] = project;

    return res.json(project);

    // return res.json([
    //     'Project 04', //Alterado de 01 para 04
    //     'Project 02',
    //     'Project 03'
    // ])
});

app.delete('/projects/:id', (req, res) => {
    const {id} = req.params;

    const projectIndex = projects.findIndex(project => project.id === id);
    
    if(projectIndex < 0) {
        return res.status(404).json({ error: 'Project not found'})
    }

    projects.splice(projectIndex, 1);

    return res.status(204).send();
});


/**
 * Tipos de parâmetros:
 * 
 * Query Params: Filtros e Paginação | Começa com '?' e se necessário
 * pode ir acrescentando parâmetros com o '&' 
 * Exemplo: /projects?title=React&owner=Diego
 * Route Params: Identificar recursos (Atualizar/Deletar)
 * Request Body: Enviar conteúdo para criação ou edição de um recurso (JSON)
 */


app.get('/', (req, res) => {
    return res.json({message: 'Hello World!'});
})

app.listen(3333, () => {
    console.log('🚀 - Backend has been started')
});