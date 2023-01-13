const authByEmailPwd = (email, password) => {

    const usuario = prisma.find(usuario => usuario.email === email);

    if(!usuario) throw new Error();
    if(usuario.password !== password) throw new Error();

    return usuario;

}

export default authByEmailPwd;