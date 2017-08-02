/**
 * 
 * Arquivo: GL.API/models/post.js
 * Author: Glaucia Lemos
 * Description: Arquivo responsável pelo modelo: 'Post' para realizar a conexão com a base
 *  de dados via Moongose.
 * Data: 01/08/2017
 * 
 */

/**
 * Infos inerentes a classe: 
 * ==== Post ====
 * id: number
 * title: string
 * name: string
 * email: string
 * body: string
 */

//Esquema do 'Post':
var PostSchema = new PostSchema(
    {
        title: { type: String, required: true },
        name: { type: String, required: true },
        email: { type: String, required: true },
        body: { type: String, required: true },
    },
    {
        versionKey: false
    }
);


