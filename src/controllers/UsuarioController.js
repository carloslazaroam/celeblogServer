const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcrypt');
const fs = require('fs');
BigInt.prototype.toJSON = function () { return this.toString() }

const createUser = async (request, response) => {
    const userpass = request.body.password;
    const password = await bcrypt.hash(userpass, 8);
    try {
        const result = await prisma.usuario.create({
            data: {
                nombre: request.body.nombre,
                apellidos: request.body.apellidos,
                email: request.body.email,
                usuario: request.body.usuario,
                images: request.file.path,
                password,
                tipousuario: {
                    connect: {
                        id: 2
                    }
                }
            }
        });
        delete result.password;
        response.send(JSON.stringify(result.id));

    } catch (error) {
        fs.unlinkSync(request.file.path);
        console.log(error);
        response.send(JSON.stringify("Error al crear usuario"));
    }
}

const getUser = async (request, response) => {
    const id = BigInt(request.params.id);
    try {
        const result = await prisma.usuario.findUnique({
            where: {
                id
            },
            include: {
                tipousuario: true
            }
        });
        delete result.password;
        delete result.id_tipousuario;
        response.send(JSON.stringify(result));
    } catch (error) {
        response.send(JSON.stringify("Usuario no encontrado"));

    }
}

const updateUser = async (request, response) => {
    const usuario = request.body;
    const id = BigInt(usuario.id);
    try {
        const result = await prisma.usuario.update({
            where: {
                id
            },
            data: {
                nombre: request.body.nombre,
                apellidos: request.body.apellidos,
                email: request.body.email,
                usuario: request.body.usuario,
                tipousuario: {
                    connect: {
                        id: BigInt(request.body.id_tipousuario)
                    }
                }

            }

        });
        delete result.password;
        response.send(JSON.stringify(result));

    } catch (error) {
        response.send(JSON.stringify("Usuario no actualizado"));

    }


}

const deleteUser = async (request, response) => {
    const usuario = request.body;
    const id = BigInt(request.params.id);
    try {
        const result = await prisma.usuario.delete({
            where: {
                id
            }

        });
        response.send(JSON.stringify(result.id));

    } catch (error) {
        response.send(JSON.stringify("El usuario no ha podido ser eliminado"));

    }
}

const getPage = async (request, response) => {
    const page = request.query.page ? parseInt(request.query.page) : 0;
    const size = request.query.size ? parseInt(request.query.size) : 5;
    const nombre = request.query.nombre ? request.query.nombre : '';
    const sort = request.query.sort ? request.query.sort : 'id';
    const direction = request.query.direction ? request.query.direction : 'asc';

    try {

        const userCount = await prisma.usuario.count()

        const result = await prisma.usuario.findMany({
            skip: (size * page),
            take: size,
            where: {
                nombre: {
                    contains: nombre,
                    
                },
               

                

            },
            orderBy: {
                [sort]: direction
            },

            include: {
                tipousuario: true
            }
        });
        result.forEach(usuario => {
            delete usuario.password;
            delete usuario.id_tipousuario;

        })
        const userResponse ={
            content: result,
            "totalRegisters" : result.length,
            "totalPages": Math.round(userCount / size),
            "actualPage" : page
        }
        console.log(userResponse);
        response.send(JSON.stringify(userResponse));

    } catch (error) {
        console.log(error)
        response.send(JSON.stringify("Error al buscar la página"));

    }

}


const nombres = ["Ainhoa", "Kevin", "Estefania", "Cristina",
    "Jose Maria", "Lucas Ezequiel", "Carlos", "Elliot", "Alexis", "Ruben", "Luis Fernando", "Karim", "Luis",
    "Jose David", "Nerea", "Ximo", "Iris", "Alvaro", "Mario", "Raimon"];

const apellidos = ["Benito", "Blanco", "Boriko", "Carrascosa", "Guerrero", "Gyori",
    "Lazaro", "Luque", "Perez", "Perez", "Perez", "Rezgaoui", "Rodríguez", "Rosales", "Soler", "Soler", "Suay", "Talaya", "Tomas", "Vilar"];

const usuarios = ["Beni", "Blan", "Boris", "Carras", "Joseguantes", "Gyo",
    "Laza", "Luq", "Per", "Pere", "Perezoso", "Rezga", "Ro", "Rosa", "Saler", "Sol", "Guay", "Tala", "Tom", "Villar"];

const generateUser = async (request, response) => {
    const userpass = 'password';
    const password = await bcrypt.hash(userpass, 8);
    try {
        const result = await prisma.usuario.create({
            data: {
                nombre: nombres[Math.floor(Math.random() * nombres.length)],
                apellidos: apellidos[Math.floor(Math.random() * apellidos.length)],
                email: nombres[Math.floor(Math.random() * nombres.length)] + "@gmail.com",
                usuario: usuarios[Math.floor(Math.random() * usuarios.length)],
                password,
                tipousuario: {
                    connect: { id: BigInt(Math.floor(Math.random() * 2) + 1) }
                }
            }
        });
        delete result.password;
        response.send(JSON.stringify(result));
    } catch (error) {
        console.log(error);
        response.send(JSON.stringify("Error al crear user"));
    }
}





module.exports = { createUser, getUser, updateUser, deleteUser, getPage, generateUser }