const { PrismaClient } = require('@prisma/client');
const { post } = require('../routes/AuthRoutes');
const prisma = new PrismaClient();
BigInt.prototype.toJSON = function () { return this.toString() }


const getCategoria = async (request, response) => {
    
    const id = BigInt(request.params.id);
    try {
        const result = await prisma.categoria.findUnique({
            where: {
                id
            },
            include: {
            
                tipocategoria: true
            }
            

        });

        
        delete result.id_tipocategoria;
        
        response.send(JSON.stringify(result));

    } catch (error) {
        response.send(JSON.stringify("La categoria no ha podido ser encontrado"));

    }
}

const createCategoria = async (request, response) => {
    
    try {
        const result = await prisma.categoria.create({
            data: {
                
                nombre: request.body.nombre,
                descripcion: request.body.descripcion,
                tipocategoria: {
                    connect: {
                        id: BigInt(request.body.id_tipocategoria)
                    }
                }
            }
        });
        response.send(JSON.stringify(result.id));

    } catch (error) {
        console.log(error);
        response.send(JSON.stringify("Error al crear categoria"));
    }
}

const updateCategoria = async (request, response) => {
    const categoria = request.body;
    const id = BigInt(categoria.id);
    try {
        const result = await prisma.categoria.update({
            where: {
                id
            },

            data: {
                
                nombre: request.body.nombre,
                descripcion: request.body.descripcion,
                
                tipocategoria: {
                    connect: {
                        id: BigInt(request.body.id_tipocategoria)
                    }
                }
            }
            

        });
        response.send(JSON.stringify(result));

    } catch (error) {
        response.send(JSON.stringify("Categoria no actualizada"));

    }


}

const deleteCategoria = async (request, response) => {
    const categoria = request.body;
    const id = BigInt(request.params.id);
    try {
        const result = await prisma.categoria.delete({
            where: {
                id
            }

        });
        response.send(JSON.stringify(result.id));

    } catch (error) {
        response.send(JSON.stringify("La categoria no ha podido ser eliminada"));

    }
}

const getPageCategoria = async (request, response) => {
    const page = request.query.page ? parseInt(request.query.page) : 0;
    const size = request.query.size ? parseInt(request.query.size) : 0;
    const nombre = request.query.nombre ? request.query.nombre : '';
    const sort = request.query.sort ? request.query.sort : 'id';
    const direction = request.query.direction ? request.query.direction : 'asc';
    const tipocategoria = request.query.tipocategoria ? parseInt(request.query.tipocategoria) : 0;
    

    try {

        const categoriaCount = await prisma.categoria.count()
        const result = await prisma.categoria.findMany({
            skip: (size * page),
            take: size,
            where: {
                nombre: {
                    contains: nombre
                },AND: {
                    id_tipocategoria: tipocategoria === 0 ? undefined : tipocategoria
                }
            },
            orderBy: {
                [sort]: direction
            },

            include: {
                
                tipocategoria: true
            }

            
        });
        result.forEach(categoria => {
           
            
            
            

        });
        const categoriaResponse ={
            content: result,
            "totalRegisters" : result.length,
            "totalPages": Math.round(categoriaCount / size),
            "actualPage" : page
        }
       
        response.send(JSON.stringify(categoriaResponse));

    } catch (error) {
        response.send(JSON.stringify("Error al buscar la p??gina"));

    }

}




module.exports = { getCategoria, createCategoria, updateCategoria, deleteCategoria, getPageCategoria }

