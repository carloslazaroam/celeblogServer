const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcrypt');
BigInt.prototype.toJSON = function () { return this.toString() }

const getTipoCategorias = async (request, response) => {
    try {
        result = await prisma.tipocategoria.findMany();
        response.send(JSON.stringify(result));
    } catch (error) {
        response.send(JSON.stringify("Error"));
    }
}


module.exports = { getTipoCategorias }