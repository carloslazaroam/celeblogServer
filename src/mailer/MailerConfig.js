 const nodemailer = require('nodemailer');

const createTrans = () => {
  const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "2473fed7395f5a",
      pass: "f2981249b58055"
    }
  });
  return transport
}


const sendEmail =  async (nombre, email, token) => {
  const transporter = createTrans();
  const info =await transporter.sendMail({
    from: '"Fred Foo 👻" <traceur35@gmail.com>',
    to: `${email}`, 
    subject: "CREAR NUEVA PASSWORD", 
    html: `<b>Hola,${nombre}, <br>
    Puedes crear una nueva contraseña en el siguiente enlace: <br>
    http://localhost:4200/reset-password/${token}
    </b>`,
  });
  console.log('mensaje enviado');
} 

 exports.sendMail = (nombre,email, token) => sendEmail(nombre, email, token);