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

chai.use(chaiHttp);

//Bloco de código responsável por realizar os testes:
describe('Posts', function() {
    beforeEach(function(done) {

        //Aqui estarei 'limpando' a base de dados sempre quando for executar os testes:
        Post.remove({}, function(error) {
            done();
        });
    });   

    // ==> Testando a rota: /GET
    describe('/GET post', function() {
        it('Deve selecionar todos os Posts', function(done) {
            chai.request(server)
            .get('/post')
            .end(function(error, res) {

                //Se a rota estiver e selecionar todos os 'Posts' deverá retornar status: 200 - OK
                res.should.have.status(200);

                //Apresentando o status OK, devo retornar um array com todos os posts cadastrados no Banco:
                res.body.should.be.a('array');
        
            done();
            });
        });    
    });
    
    // ==> Testando a rota: /POST
    describe('/POST post', function() {
        it('Não deve retornar o método: POST da Postagem criada. Uma vez que não foi definido o campo: name', function(done) {
        
            //Simulando a criação de um novo Post. Porém sem definir o campo 'name':
            var post = {
                title: "Transferência Milionária",
                email: "teste@gmail.com",
                body: "Neymar deve fazer exames na quinta em Paris e ser apresentado na sexta"           
            }

            chai.request(server)
            .post('/post')
            .send(post)
            .end(function(error, res) {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('errors');
                res.body.errors.should.have.property('name');
                res.body.errors.name.should.have.property('kind').eql('required');
                done();
            });
        });

           it('Deve Criar um Post', function(done) {

            var post = {
                title: "Transferência Milionária",
                name: "Rodrigo",
                email: "teste@gmail.com",
                body: "Neymar deve fazer exames na quinta em Paris e ser apresentado na sexta"           
            } 

            chai.request(server)
            .post('/post')
            .send(post)
            .end(function(error, res) {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.post.should.have.property('title');
                res.body.post.should.have.property('name');
                res.body.post.should.have.property('email');
                res.body.post.should.have.property('body');
            done();
            }); 
        });        
    });

    // ==> Testando a rota: /GET/:id
    describe('/GET/:id post', function() {
        it('Deve retornar um Post dado o id', function(done) {
            
            var post = new Post({
                title: "Transferência Milionária",
                name: "Rodrigo",
                email: "teste@gmail.com",
                body: "Neymar deve fazer exames na quinta em Paris e ser apresentado na sexta" 
            });

            post.save(function(error, post) {
                chai.request(server)
                .get('/post/' + post.id)
                .send(post)
                .end(function(error, res) {
                    res.should.be.a('object');
                    res.body.should.have.property('title'); 
                    res.body.should.have.property('name');
                    res.body.should.have.property('email');
                    res.body.should.have.property('body');
                    res.body.should.have.property('_id').eql(post.id);
                    done();    
                });
            });
        });    
    });

    
});