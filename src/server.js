/**
 * 
 * Arquivo: server.js
 * Author: Glaucia Lemos
 * Description: Arquivo principal e responsável por executar a API.
 * Data: 01/08/2017
 * 
 */

//Require das dependências que estarei utilizando durante o desenvolvimento:
var express = require('express');
var app = express();
var mongoose = require('mongoose');
var morgan = require('morgan');
var bodyParser = require('body-parser');

var port = 8000;
var post = require('./GL.API/routes/post');
var config = require('config'); //require necessário que irá realizar a conexão com a base de dados

//Opção das bases de dados:
var options = { 
    server: { socketOptions: { keepAlive:1, connectTimeoutMS: 30000 }},
    replset: { socketOptions: { keepAlive:1, connectTimeoutMS: 30000 }}
}

//Conexão com a base de dados via 'mongoose':
mongoose.connect(config.DBHost, options);
var database = mongoose.connection;
database.on('error', console.error.bind(console, 'Erro ao conectar com a Base de Dados....: '));

//Bloco de código responsável por mostrar os logs quando realizarmos os testes:
if(config.util.getEnv('NODE_ENV') !== 'test') {

    //'Morgan' é responsável por realizar as requisições de logger no middleware do Node.Js:    
    app.use(morgan('combined'));
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'application/json' }));

app.get("/", (req, res) => res.json({ message: "Sejam Bem-Vindos a API: Lambda3!" }));

//Definindo as rotas: GET & POST:
app.route("/post")
    .get(post.getAllPosts)
    .post(post.addPost);

//Definindo as rotas: GET, DELETE & PUT
app.route("/post/:id")
    .get(post.postById)
    .delete(post.deletePost)
    .put(post.updatePost);

app.listen(port);
console.log("API executando na porta......: " + port);

module.exports = app;
