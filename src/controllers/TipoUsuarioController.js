const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcrypt');
BigInt.prototype.toJSON = function () { return this.toString() }

const getTipoUsuarios = async (request, response) => {
    const page = request.query.page ? parseInt(request.query.page) : 0;
    const size = request.query.size ? parseInt(request.query.size) : 5;
    try {

        const tipousuarioCount = await prisma.tipousuario.count()
        const result = await prisma.tipousuario.findMany();
        response.send(JSON.stringify(result));
        const TipoUsuarioResponse ={
            content: result,
            "totalRegisters" : result.length,
            "totalPages": Math.round(tipousuarioCount / size),
            "actualPage" : page
        }
    } catch (error) {
        response.send(JSON.stringify("Error"));
    }
}


module.exports = { getTipoUsuarios }