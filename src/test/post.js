/*
 *
 * Arquivo: test/post.js
 * Author: Glaucia Lemos
 * Description: Arquivo responsável por realizar o TDD com Mocha && Chai no lado do server da api.
 * Data: 21/10/2016
 *
 */

process.env.NODE_ENV = 'test';

var mongoose = require('mongoose');
var Post = require('../api/models/post');

//Pacotes para realização dos testes no Node.Js: Mocha & Chai
var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../server');
var should = chai.should();