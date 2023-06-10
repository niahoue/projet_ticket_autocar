// adminController.js

const Admin = require('../models/Admin');
const User = require('../models/User');
const Company = require('../models/Company');
const keys = require('../config/adminKey');
const bcrypt = require('bcryptjs')

exports.loginPage = (req,res) => {
  res.render('adminLogin');
}
exports.registerPage = (req,res) =>{
  res.render('adminRegister');
}
exports.registerAdmin = async (req, res) => {
  const { username, email,password, registrationKey } = req.body;

  try {
    if (!keys.registrationKeys.includes(registrationKey)) {
      return res.status(403).json({ error: 'Clé d\'inscription invalide' });
    }else{
      const admin = new Admin({
        username: username,
        email:email,
        password: password
      });
       // Hash password
       const salt = await bcrypt.genSalt(10);
       const hash = await bcrypt.hash(admin.password, salt);
       admin.password = hash;

       await admin.save();
       req.flash('success_msg', 'Vous êtes maintenant inscrit et pouvez vous connecter');
              res.redirect('/admin/login');
    }

  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
  }
};

exports.loginAdmin = async (req, res) => {
  const { username, password } = req.body;
  try {
    // Logique pour vérifier les informations de connexion de l'administrateur
    const admin = await Admin.findOne({ username: username, password: password });
    if (!admin) {
      // Gérer le cas où l'administrateur n'est pas trouvé
      return res.status(404).send('Administrateur introuvable');
    }
    // Authentifiez l'administrateur et créez une session si les informations sont valides
    req.session.admin = admin;
    res.redirect('/admin/dashboard');
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
  }
};


// Logique pour récupérer les utilisateurs depuis le modèle
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.render('manage-users', { users: users });
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
  }
};

// Logique pour récupérer les compagnies à vérifier depuis le modèle
exports.getVerifyCompanies = async (req, res) => {
  try {
    const companies = await Company.find({ verified: false });
    res.render('verify-company', { companies: companies });
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
  }
};

// Logique pour supprimer une compagnie
exports.deleteCompany = async (req, res) => {
  try {
    await Company.findByIdAndRemove(req.params.id);
    res.redirect('/admin/verify-company');
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
  }
};

// Logique pour vérifier une compagnie
exports.verifyCompany = async (req, res) => {
  try {
    await Company.findByIdAndUpdate(req.params.id, { verified: true });
    res.redirect('/admin/verify-company');
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
  }
};

// Logique pour supprimer un utilisateur
exports.deleteUser = async (req, res) => {
  try {
    await User.findByIdAndRemove(req.params.id);
    res.redirect('/admin/manage-users');
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
  }
};


    
