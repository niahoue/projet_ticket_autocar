const Company = require('../models/Company');
const Trip = require('../models/Trip')
const bcrypt = require('bcryptjs');
const passport = require('passport');

//Gestion de la connexion d'une compagnie
exports.companyLogin = (req,res)=>{
    res.render('loginCompany',{
      title:'connexion compagnie'
    })
};

exports.companyPost = (req,res,next) =>{
    passport.authenticate('local',{
        successRedirect:'/company/dashboard',
        failureRedirect:'/company/login',
        failureFlash:true
        })(req,res,next)
        }

exports.companyRegister = (req,res) =>{
    res.render('registerCompany', { title: 's\'incrire en tant que compagnie' });
}

exports.createCompany = async (req, res) => {
    const { name, email, phone, siege, password, password2 } = req.body;
    let errors = [];
  
    try {
      if (!name || !email || !password || !password2 || !phone || !siege) {
        errors.push({ msg: 'Veuillez remplir tous les champs' });
      }
  
      if (password !== password2) {
        errors.push({ msg: 'Les mots de passe ne correspondent pas' });
      }
  
      if (password.length < 8) {
        errors.push({ msg: 'Le mot de passe doit faire au moins 8 caractères' });
      }
  
      if (errors.length > 0) {
        res.render('registerCompany', {
          title: 'S\'inscrire en tant que compagnie',
          errors: errors,
          name: name,
          email: email,
          phone: phone,
          siege: siege,
          password: password,
          password2: password2
        });
      } else {
        const newCompany = new Company({
          name: name,
          email: email,
          phone: phone,
          siege: siege,
          password: password
        });
  
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(newCompany.password, salt);
        newCompany.password = hash;
  
        await newCompany.save();
  
        req.flash('success_msg', 'Votre compte a été créé avec succès');
        res.redirect('/company/login');
      }
    } catch (err) {
      console.log(err);
      res.render('registerCompany', {
        title: 'S\'inscrire en tant que compagnie',
        errors: [{ msg: 'Une erreur s\'est produite lors de la création du compte' }],
        name: name,
        email: email,
        phone: phone,
        siege: siege,
        password: password,
        password2: password2
      });
    }
  };
//gestion de logout pour compagnie
exports.logoutCompany = (req, res) => {
    req.logout((error) =>{
      if(error){
        console.log(error);
      }else{
        req.flash('success_msg', 'Vous êtes déconnecté');
        res.redirect('/company/login');
      }
    });
    }
     
    exports.companyDashboard = async(req, res) => {
        try {
            // Récupérer les trajets soumis par les compagnies depuis la base de données
            const trips = await Trip.find();
            // Récupérer les prix des trajets soumis par les compagnies
            const prices = trips.map(trip => trip.price);
        
            // Passer les données récupérées à la vue du tableau de bord des compagnies
            res.render('companyDashboard', { trips, prices });
          } catch (err) {
            console.log(err);
            // Gérer l'erreur de récupération des trajets depuis la base de données
            res.render('error', { message: 'Une erreur est survenue lors de la récupération des trajets' });
          }
      };


      exports.submitTrip = async (req, res) => {
        const { company, type, departure, destination, departureTime, price } = req.body;
        try {
          const trip = new Trip({
            company,
            type,
            departure,
            destination,
            departureTime,
            price
          });
      
          await trip.save();
          req.flash('success_msg', 'trajet crée ');
          res.redirect('/company/dashboard');
        } catch (error) {
          console.log(error)
          res.render('companyDashboard', {
            errors: [{ msg: 'Une erreur s\'est produite lors de l\'inscription' }],
            company,
            departure,
            destination,
            departureTime,
            price
          });
        }
      }