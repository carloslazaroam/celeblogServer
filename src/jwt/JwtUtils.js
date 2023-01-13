const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');

dotenv.config();
const secretkey = process.env.SECRET_KEY;

const generateToken = (id, username) => {
    return jwt.sign({id, username }, secretkey, { expiresIn: '30m' });
}

const generateTokenResetPassword = (id) => {
    return jwt.sign({id}, secretkey, { expiresIn: '5m' });
}

const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token =authHeader && authHeader.split(' ')[1];

    if (token == null) {
        return res.sendStatus(401)
    }

    jwt.verify(token, process.env.SECRET_KEY, (err, user) => {

        if (err) {
            console.log(err);
            return res.sendStatus(403)
        } else {
            req.user = user
            next()
        }
    });
}

module.exports = {generateToken, generateTokenResetPassword, verifyToken}