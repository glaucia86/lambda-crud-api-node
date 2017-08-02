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

//==> 1) Método: 'getAllPosts' (acessar em: GET: http://localhost:8000/post)
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
