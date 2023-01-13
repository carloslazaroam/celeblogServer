const { PrismaClient } = require('@prisma/client');
const { post } = require('../routes/AuthRoutes');
const prisma = new PrismaClient();
BigInt.prototype.toJSON = function () { return this.toString() }

const getPost = async (request, response) => {
    const post = request.body;
    const id = BigInt(request.params.id);
    try {
        const result = await prisma.post.findUnique({
            where: {
                id
            },
            include: {
                usuario: true
            }

        });
        delete result.id_user;
        response.send(JSON.stringify(result));

    } catch (error) {
        response.send(JSON.stringify("El post no ha podido ser encontrado"));

    }
}

const createPost = async (request, response) => {
    
    try {
        const result = await prisma.post.create({
            data: {
                title: request.body.title,
                contenido: request.body.contenido,
                datetime: request.body.datetime,
                validacion: request.body.validacion,
                usuario: {
                    connect: {
                        id: BigInt(request.body.id_user)
                    }
                }
            }
        });
        response.send(JSON.stringify(result.id));

    } catch (error) {
        console.log(error);
        response.send(JSON.stringify("Error al crear usuario"));
    }
}

const updatePost = async (request, response) => {
    const post = request.body;
    const id = BigInt(post.id);
    try {
        const result = await prisma.post.update({
            where: {
                id
            },
            data: {
                title: request.body.title,
                contenido: request.body.contenido,
                datetime: request.body.datetime,
                validacion: request.body.validacion,
                usuario: {
                    connect: {
                        id: BigInt(request.body.id_user)
                    }
                }

            }

        });
        response.send(JSON.stringify(result));

    } catch (error) {
        response.send(JSON.stringify("Post no actualizado"));

    }


}

const deletePost = async (request, response) => {
    const post = request.body;
    const id = BigInt(request.params.id);
    try {
        const result = await prisma.post.delete({
            where: {
                id
            }

        });
        response.send(JSON.stringify(result.id));

    } catch (error) {
        response.send(JSON.stringify("El post no ha podido ser eliminado"));

    }
}

const getPage = async (request, response) => {
    const page = request.query.page ? parseInt(request.query.page) : 0;
    const size = request.query.size ? parseInt(request.query.size) : 0;
    const title = request.query.title ? request.query.title : '';
    const sort = request.query.sort ? request.query.sort : 'id';
    const direction = request.query.direction ? request.query.direction : 'asc';

    try {

        const postCount = await prisma.post.count()
        const result = await prisma.post.findMany({
            skip: (size * page),
            take: size,
            where: {
                title: {
                    contains: title
                }
            },
            orderBy: {
                [sort]: direction
            },

            
        });
        result.forEach(post => {
            
            

        });
        const postResponse ={
            content: result,
            "totalRegisters" : result.length,
            "totalPages": Math.round(postCount / size),
            "actualPage" : page
        }
        response.send(JSON.stringify(postResponse));

    } catch (error) {
        response.send(JSON.stringify("Error al buscar la página"));

    }

}

module.exports = { getPost , createPost, updatePost, deletePost, getPage }