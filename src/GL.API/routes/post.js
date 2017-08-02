/*
 *
 * Arquivo: GL.API/routes/post.js
 * Author: Glaucia Lemos
 * Description: Arquivo responsável pelas rotas das APIS: GET, PUT, DELETE & POST
 * Data: 01/08/2017
 * 
 */

//Importando o pacote 'mongoose' e o esquema criado na pasta 'models':
var mongoose = require('mongoose');
var Post = require('../models/post');

//==> 1) Método: 'getAllPosts' (acessar em: GET: http://localhost:8000/posts)
function getAllPosts(req, res) {
    
    var query = Post.find({});
    query.exec(function(error, posts) {
        if(error)
            //res.status(400).send('Erro ao Selecionar todos os Posts!'); //testar..
            //res.status(400).json(error, 'Erro ao Selecionar todos os Posts!');
            res.send(error);

        //res.status(200).json(posts); //testar depois....
        res.json(posts);
    });
}

// ==> 2) Método: 'addPost' (acessar em: POST: http://localhost:8000/post)
function addPost(req, res) {

    //Primeiro eu crio um novo 'Post'
    var newPost = new Post(req.body);

    //Depois salvar as infos concedidas ao usuário na base de dados:
    newPost.save(function(error, post) {
        if(error) {
            //res.status(400).send('Erro ao Criar um Novo Post!'); //testar..
            //res.status(400).json(error, 'Erro ao Criar um Novo Post!');
            res.send(error);
        } else {
            //res.status(200).json(message: 'Post criado com sucesso!', post); //testar depois....
            res.json({ message: 'Post criado com sucesso!', post });   
        }        
    });
}

// ==> 3) Método: 'postById' (acessar em: POST: http://localhost:8000/post/:id)
function postById(req, res) {
    Post.findById(req.params.id, function(error, post) {
        if(error)
            //res.status(400).send('Erro ao Selecionar o Livro pelo Id!'); //testar..
            //res.status(400).json(error, 'Erro ao Selecionar o Livro pelo Id!');
            res.send(error);

        //res.status(200).json(posts);
        res.json(post);
    });
}
