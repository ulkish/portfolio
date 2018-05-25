const express = require("express");
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const nodemailer = require('nodemailer');
const path = require('path');

const app = express();

// Setup de view engine
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

// Carpeta estática
app.use('/src', express.static(path.join(__dirname, 'src')));

// Middleware de Body Parser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.render("index");
});

app.post('/send', (req, res) => {
  const output = `
    <p>You have a new contact request</p>
    <h3>Contact Details</h3>
    <ul>
      <li>Nombre: ${req.body.name}</li>
      <li>Email: ${req.body.email}</li>
      <li>Mensaje: ${req.body.message}</li>
    </ul>
    <h3>Mensaje</h3>
    <p>${req.body.message}</p>
  `;
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: 'hugonodemailer@gmail.com',
      pass: 'inrainbows' // generated ethereal password
    },
    tls: {
        rejectUnauthorized: false
    }
  });

  // setup email data with unicode symbols
  let mailOptions = {
    from: '"Mensaje desde portfolio!" <hugonodemailer@gmail.com>', // sender address
    to: 'dev.hugomoran@gmail.com, vantheldriel@gmail.com', // list of receivers
    subject: 'Has sido contactado!', // Subject line
    text: 'Hello world?', // plain text body
    html: output // html body
  };

  // send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log('Message sent: %s', info.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

    res.render('index', {msg:'Tu mensaje ha sido enviado!'})

  });
});

app.listen(process.env.PORT, process.env.IP, function() {
        console.log("Server is running!");
});



// app.listen(3000, () => console.log("Server ir running!"));