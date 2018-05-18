var express = require('express');
var app = express();

//var post = require('./api/routes/post');
var post = require('../api/routes/post');

//Definição das rotas para: GET (Selecionar Todos)
app.route("/posts")
    .get(post.getAllPosts)

//Definição das rotas para: POST:   
app.route("/post")	
    .post(post.addPost);
    
//Definição das rotas para: GET, DELETE & PUT (todos por Id)
app.route("/post/:id")
	.get(post.postById)
	.delete(post.deletePost)
	.put(post.updatePost);