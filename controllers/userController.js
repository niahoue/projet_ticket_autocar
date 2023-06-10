const User = require('../models/User');
const Trip= require('../models/Trip')
const Booking = require('../models/Booking')
const bcrypt = require('bcryptjs');
const passport = require('passport');



//Gestion de la connexion d'un utilisateur.
exports.login = (req,res) =>{
    res.render('userLogin')
}
//Gestion de la connexion d'un utilisateur.
exports.loginPost = async (req,res,next) => {
  
      await  passport.authenticate('local',{
        successRedirect:'/users/dashboard',
        failureRedirect:'/users/login',
        failureFlash:true
        })(req,res,next);
    
   }

//Gestion de l'inscription d'un utilisateur.
exports.getRegister = (req, res) => {
    res.render('userRegister', { title: 'se connecter en tant qu\'utilisateur' });
    };

    exports.registerPost = async (req, res) => {
        const { name, email, password, password2 } = req.body;
        let errors = [];
      
        try {
          if (!name || !email || !password || !password2) {
            errors.push({ msg: 'Remplissez tous les champs obligatoires' });
          }
      
          if (password !== password2) {
            errors.push({ msg: 'Les mots de passe ne correspondent pas' });
          }
      
          if (password.length < 6) {
            errors.push({ msg: 'Les mots de passe doivent contenir au moins 6 caractères' });
          }
      
          if (errors.length > 0) {
            res.render('userRegister', {
              errors,
              name,
              email,
              password,
              password2
            });
          } else {
            // Validation passed
            // Save user
            const userExists = await User.findOne({ email });
      
            if (userExists) {
              errors.push({ msg: 'L\'email existe déjà' });
              res.render('userRegister', {
                errors,
                name,
                email,
                password,
                password2
              });
            } else {
              const newUser = new User({
                name,
                email,
                password
              });
      
              // Hash password
              const salt = await bcrypt.genSalt(10);
              const hash = await bcrypt.hash(newUser.password, salt);
              newUser.password = hash;
      
              await newUser.save();
      
              req.flash('success_msg', 'Vous êtes maintenant inscrit et pouvez vous connecter');
              res.redirect('/users/login');
              
            }
          }
        } catch (err) {
          console.log(err);
          res.render('userRegister', {
            errors: [{ msg: 'Une erreur s\'est produite lors de l\'inscription' }],
            name,
            email,
            password,
            password2
          });
        }
      };


//gestion du logout
exports.logoutUser = (req,res) =>{
  req.logout((err) => {
    if(err) {
        console.log(err); 
    } else {
      req.flash("success_msg","Vous êtes maintenant déconnecté");
      res.redirect('/users/login');
    }
});
   }

//gestion du tableau de bord

exports.dashboard =  (req, res) => {
   res.render('userDashboard',{
    user: req.user,
    title: "Tableau de bord",
   
   })
  };
 ///////////////////////////////////////////////////////////////////////////////////
 exports.homepage = (req,res)=>{
  res.render('booking',{ title: 'Réservation de billet de voyage' })
};


exports.createBooking = async (req, res) => {
const { type, company, depart, destination, date, time, passengers, oneway } = req.body;

try {
  const trip = await Trip.findOne({
    type:type,
    company:company._id,
    'routes.departure': depart,
    'routes.destination': destination,
    date:date,
    time:time,
    passengers:passengers,
    oneway:oneway
  });

  if (trip) {
    const totalPrice = trip.routes[0].price * passengers; // Calcul du prix total

    const booking = new Booking({
      userId: req.user.id, // ID de l'utilisateur actuellement connecté
      tripId: trip._id,
      type,
      company,
      depart,
      destination,
      date,
      time,
      passengers,
      oneway,
      totalPrice
    });

    await booking.save();

    // Rediriger l'utilisateur vers une page de confirmation ou afficher un message de succès
    res.redirect(`/users/booking/confirmation/${booking._id}`)
  } else {
    res.render('booking-error', { title: 'Erreur de réservation', message: 'Impossible de trouver le trajet correspondant' });
  }
} catch (error) {
  console.log(error);
  res.render('booking-error', { title: 'Erreur de réservation', message: 'Une erreur s\'est produite lors de la création de la réservation' });
}
};

// Display the booking confirmation page
exports.showConfirmationPage = async (req, res) => {
try {
  // Retrieve the booking details from the database
  const booking = await Booking.findById(req.params.bookingId)
    .populate('tripId')
    .exec();

  // Render the confirmation page with the booking details
  res.render('bookingConfirmation', { booking });
} catch (error) {
  // Handle error and display an appropriate message
  console.error(error);
  res.status(500).send('An error occurred while retrieving the booking details');
}
};