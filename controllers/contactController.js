const Message = require('../models/Message');
const nodemailer = require('nodemailer');


exports.getContactForm = (req,res) =>{
    res.render('contact', {title: 'Contactez-nous' });
};


exports.postContactForm = (req,res,next) =>{
 
  const { name, email,phone, message } = req.body;

  // Créer un transporteur de messagerie
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
     user: 'apacome343@gmail.com',
     pass: 'ghtptjkrxnajdzer',
    },
  });

  // Configurer le contenu de l'email
  const mailOptions = {
    from: email,
    to: 'recipient-apacome343@gmail.com',
    subject: 'Nouveau message de contact',
    text: `Nom: ${name}\n Email: ${email}\n Telephone: ${phone}\nMessage: ${message}`
  };

  // Envoyer l'email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      // Gérer l'erreur d'envoi de l'email
    } else {
      console.log('Email sent: ' + info.response);
      // Rediriger l'utilisateur vers une page de confirmation ou afficher un message de succès
      res.render('contact-success', { title: 'Message envoyé', name });
    }
  });
};

exports.saveMessage = async (req, res) => {
  const { name, email, phone, message } = req.body;
  const messages = new Message({
    name,
    email,
    phone,
    message,
    createdAt:new Date()
  });

  try {
 
   await messages.save();
    res.render('contact-success', { title: 'Message envoyé', name });
  } catch (error) {
    console.log(error);
    res.send('Erreur d\'enregistrement du message' );
  }
};

