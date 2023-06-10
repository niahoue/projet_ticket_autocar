// authController.js

const User = require('../models/User');
const { generateToken, decodeToken, hashPassword, comparePasswords } = require('../config/authUtils');

// Afficher le formulaire de demande de réinitialisation du mot de passe
exports.resetPasswordRequestForm = (req, res) => {
  res.render('auth/reset-password-request');
};

// Soumettre la demande de réinitialisation du mot de passe
exports.resetPasswordRequest = async (req, res) => {
  try {
    const { email } = req.body;

    // Recherchez l'utilisateur par adresse e-mail
    const user = await User.findOne({ email });

    if (!user) {
      // L'utilisateur n'a pas été trouvé, affichez un message d'erreur ou redirigez vers une page d'erreur
      return res.render('auth/reset-password-request', { error: 'Utilisateur non trouvé' });
    }

    // Générez un token de réinitialisation du mot de passe
    const token = generateToken({ email });

    // Envoyez l'e-mail contenant le lien de réinitialisation du mot de passe avec le token
    // Utilisez un service d'envoi d'e-mails comme Nodemailer pour envoyer l'e-mail

    // Affichez un message de succès ou redirigez vers une page de succès
    res.render('auth/reset-password-request', { success: 'Un e-mail a été envoyé avec les instructions de réinitialisation du mot de passe' });
  } catch (error) {
    // Gestion des erreurs
    console.error(error);
    res.render('auth/reset-password-request', { error: 'Une erreur s\'est produite. Veuillez réessayer.' });
  }
};

// Afficher le formulaire de réinitialisation du mot de passe
exports.resetPasswordForm = async (req, res) => {
  try {
    const { token } = req.params;

    // Décoder le token
    const { email } = decodeToken(token);

    // Vérifier si le token est valide et non expiré
    // (vous pouvez ajouter une expiration au token lors de sa génération)

    // Rendre le formulaire de réinitialisation du mot de passe avec le token
    res.render('auth/reset-password', { token });
  } catch (error) {
    // Gestion des erreurs
    console.error(error);
    res.redirect('/login');
  }
};

// Réinitialiser le mot de passe
exports.resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    // Décoder le token
    const { email } = decodeToken(token);

    // Recherchez l'utilisateur par adresse e-mail
    const user = await User.findOne({ email });

    if (!user) {
      // L'utilisateur n'a pas été trouvé, affichez un message d'erreur ou redirigez vers une page d'erreur
      return res.render('auth/reset-password', { error: 'Utilisateur non trouvé' });
    }

    // Hachez et mettez à jour le mot de passe de l'utilisateur
    const hashedPassword = await hashPassword(password);
    user.password = hashedPassword;
    await user.save();

    // Affichez un message de succès ou redirigez vers une page de succès
    res.render('auth/reset-password', { success: 'Le mot de passe a été réinitialisé avec succès' });
  } catch (error) {
    // Gestion des erreurs
    console.error(error);
    res.render('auth/reset-password', { error: 'Une erreur s\'est produite. Veuillez réessayer.' });
  }
};
