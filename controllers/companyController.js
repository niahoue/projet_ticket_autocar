const Company = require('../models/Company');
const Trip = require('../models/Trip');
const bcrypt = require('bcryptjs');
const passport = require('passport');

exports.companyLogin = (req, res) => {
  res.render('loginCompany', {
    title: 'connexion compagnie'
  });
};

exports.companyPost = async (req, res, next) => {
  await passport.authenticate('local', {
    successRedirect: '/company/dashboard',
    failureRedirect: '/company/login',
    failureFlash: true
  })(req, res, next);
};

exports.companyRegister = (req, res) => {
  res.render('registerCompany', { title: 's\'incrire en tant que compagnie' });
};

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
        company: name,
        email: email,
        phone: phone,
        siege: siege,
        password: password
      });

      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(newCompany.password, salt);
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

exports.logoutCompany = (req, res) => {
  req.logout((error) => {
    if (error) {
      console.log(error);
    } else {
      req.flash('success_msg', 'Vous êtes déconnecté');
      res.redirect('/company/login');
    }
  });
};

exports.companyDashboard = async (req, res) => {
  const companyId = req.user.company;

  try {
    const company = await Company.findById(companyId);

    if (!company) {
      req.flash('error_msg', 'La compagnie n\'a pas été trouvée');
      res.redirect('/company/login');
    } else {
      res.render('companyDashboard', {
        title: 'tableau de bord compagnie',
        company: company
      });
    }
  } catch (err) {
    console.log(err);
    req.flash('error_msg', 'Une erreur s\'est produite lors de la récupération des informations de la compagnie');
    res.redirect('/company/login');
  }
};

exports.getTrip = (req, res) => {
  res.render('submitForm');
};

exports.submitTrip = async (req, res) => {
  const { company, type, departure, destination, departureTime, price } = req.body;

  try {
    const trip = new Trip({
      company,
      type,
      routes: [{
        departure,
        arrival: destination,
        time: departureTime,
        price
      }]
    });

    await trip.save();
    req.flash('success_msg', 'trajet créé');
    res.redirect('/company/dashboard');
  } catch (error) {
    console.log(error);
    res.render('companyDashboard', {
      errors: [{ msg: 'Une erreur s\'est produite lors de l\'inscription' }],
      company,
      departure,
      destination,
      departureTime,
      price
    });
  }
};

exports.getManageTrips = (req, res) => {
  const companyId = req.user.company;

  Trip.find({ company: companyId })
    .then(trips => {
      res.render('manage-trip', { trips });
    })
    .catch(err => {
      console.log(err);
      req.flash('error_msg', 'Une erreur s\'est produite lors de la récupération des trajets');
      res.redirect('/company/dashboard');
    });
};

exports.getEditTrip = (req, res) => {
  const tripId = req.params.tripId;

  Trip.findById(tripId)
    .then(trip => {
      if (!trip) {
        req.flash('error_msg', 'Trajet non trouvé');
        res.redirect('/company/manage-trip');
      } else {
        res.render('edit-trip', { trip });
      }
    })
    .catch(err => {
      console.log(err);
      req.flash('error_msg', 'Une erreur s\'est produite lors de la récupération des informations du trajet');
      res.redirect('/company/manage-trip');
    });
};

exports.postEditTrip = (req, res) => {
  const tripId = req.params.tripId;
  const { departure, arrival, time, price } = req.body;

  Trip.findByIdAndUpdate(tripId, { "routes.$[elem].departure": departure, "routes.$[elem].arrival": arrival, "routes.$[elem].time": time, "routes.$[elem].price": price }, { arrayFilters: [{ "elem._id": tripId }] })
    .then(() => {
      req.flash('success_msg', 'Trajet mis à jour');
      res.redirect('/company/manage-trip');
    })
    .catch(err => {
      console.log(err);
      req.flash('error_msg', 'Une erreur s\'est produite lors de la mise à jour du trajet');
      res.redirect('/company/manage-trip');
    });
};

exports.getDeleteTrip = (req, res) => {
  const tripId = req.params.tripId;

  Trip.findByIdAndRemove(tripId)
    .then(() => {
      req.flash('success_msg', 'Trajet supprimé');
      res.redirect('/company/manage-trip');
    })
    .catch(err => {
      console.log(err);
      req.flash('error_msg', 'Une erreur s\'est produite lors de la suppression du trajet');
      res.redirect('/company/manage-trip');
    });
};
