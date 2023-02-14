const { PrismaClient } = require('@prisma/client');
const { post } = require('../routes/AuthRoutes');
const prisma = new PrismaClient();
BigInt.prototype.toJSON = function () { return this.toString() }

const getComentario = async (request, response) => {
    const id = BigInt(request.params.id);
    try {
        const result = await prisma.comentario.findUnique({
            where: {
                id
            },
            include: {
                usuario: true,
                post: true
            }
        });

        delete result.id_user;
        delete result.id_post;
        
        response.send(JSON.stringify(result));

    } catch (error) {
        response.send(JSON.stringify("El comentario no ha podido ser encontrado"));

    }
}

const createComentario = async (request, response) => {
    console.log(request.body)
    try {
        const result = await prisma.comentario.create({
            data: {
                contenido: request.body.contenido,
                
                datetime: new Date(),
                
                usuario: {
                    connect: {
                        id: BigInt(request.body.id_usuario)
                    }
                },
                post: {
                    connect: {
                        id: BigInt(request.body.id_post)
                    }
                }
            }
        });
        response.send(JSON.stringify(result.id));

    } catch (error) {
        console.log(error);
        response.send(JSON.stringify("Error al crear comentario"));
    }
}

const updateComentario = async (request, response) => {
    const comentario = request.body;
    
    const id = BigInt(comentario.id);
    try {
        const result = await prisma.comentario.update({
            where: {
                id
            },
            data: {
                contenido: comentario.contenido,
                datetime: new Date(),
                // puntuacion: comentario.puntuacion,
                // usuario: {
                //     connect: {
                //         id: BigInt(comentario.id_user)
                //     }
                // },
                // post: {
                //     connect: {
                //         id: BigInt(comentario.id_post)
                //     }
                // }
            }

        });
        response.send(JSON.stringify(result));

    } catch (error) {
        response.send(JSON.stringify("Comentario no actualizado"));

    }


}

const deleteComentario = async (request, response) => {
    const comentario = request.body;
    const id = BigInt(request.params.id);
    try {
        const result = await prisma.comentario.delete({
            where: {
                id
            }

        });
        response.send(JSON.stringify(result.id));

    } catch (error) {
        response.send(JSON.stringify("El comentario no ha podido ser eliminado"));

    }
}

const getPageComentario = async (request, response) => {
    const page = request.query.page ? parseInt(request.query.page) : 0;
    const size = request.query.size ? parseInt(request.query.size) : 5;
    const contenido = request.query.contenido ? request.query.contenido : '';
    const sort = request.query.sort ? request.query.sort : 'id';
    const direction = request.query.direction ? request.query.direction : 'asc';
    const id_post = request.query.id_post ? parseInt(request.query.id_post) : 0;

    try {
        const comentarioCount = await prisma.comentario.count()
        
        const result = await prisma.comentario.findMany({
            skip: (size * page),
            take: size,
            where: {
                contenido: {
                    contains: contenido
                },
                AND: {
                    id_post: id_post  === 0 ? undefined : id_post

                },
            },
            orderBy: {
                [sort]: direction
            },

            include: {
                usuario: true,
                post: true
            }

            
        });
        result.forEach(comentario => {
            
            
            

        });
        const comentarioResponse ={
            content: result,
            "totalRegisters" : result.length,
            "totalPages": Math.round(comentarioCount / size),
            "actualPage" : page
        }
        response.send(JSON.stringify(comentarioResponse));

    } catch (error) {
        console.log(error)
        response.send(JSON.stringify("Error al buscar la página"));

    }

}




module.exports = { getComentario, createComentario, updateComentario, deleteComentario, getPageComentario }