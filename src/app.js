const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

const cors = require('cors')
const helmet = require('helmet')
const morgan = require('morgan');

const bodyParser = require('body-parser');
const usuarioRoutes = require('./routes/UsuarioRoutes');
const postRoutes = require('./routes/PostRoutes');
const comentarioRoutes = require('./routes/ComentarioRoutes')
const authRoutes = require('./routes/AuthRoutes')
const tipousuarioRoutes = require('./routes/TipousuarioRoutes')
const tipocategoriaRoutes = require('./routes/TipoCategoriaRoutes')
const categoria = require('./routes/CategoriaRoutes')






app.listen(port, () => {
    console.log('Server run' + ' ' + port) 
});
app.use(express.static('src/images'));
app.use(bodyParser.json({
    limit: '20mb'
}));
app.use(bodyParser.urlencoded({ extended:true }));
app.use(helmet());
app.use(morgan('tiny'));
app.use(cors());
app.use(usuarioRoutes);
app.use(postRoutes);
app.use(authRoutes);
app.use(tipousuarioRoutes);
app.use(comentarioRoutes);
app.use(tipocategoriaRoutes);
app.use(categoria);



