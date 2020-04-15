const express = require('express');
const routes = require('./routes');
const cors = require('cors');
const app = express();


app.use(cors());

/**
 * Informa para o express que estaremos usando o formato JSON para o corpo das requisições
 */

app.use(express.json());

/**
 * Informa para o express que estaremos usando as rotas importadas do arquivo routes.js
 */

app.use(routes);

/**
 * Rota / Recurso
 */

/**
  * Métodos HTTP:
  * 
  * GET: Buscar uma informação no back-end
  * POST: Criar uma informação no back-end
  * PUT: Alterar uma informação no back-end
  * DELETE: Deletar uma informação no back-end
  */

/**
 * Tipos de Parâmetros:
 * 
 * Query Params: Parâmetros nomeados enviados na rota após o símbolo '?' (servem para filtros, paginação, etc) -> São acecessados através do request.query
 * 
 * Route Params: Parâmetros usados para identificar recursos
 * 
 * Request Body: Corpo da requisição, utilizado para criar ou alterar recursos -> Os Route Params são acessados através do request.params
 */




/**
 * Define a porta que o servidor vai escutar
 */
app.listen(3333);