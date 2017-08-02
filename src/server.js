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
