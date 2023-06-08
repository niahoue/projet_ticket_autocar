const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');

// Load User and Company models
const User = require('../models/User');
const Company = require('../models/Company');

module.exports = function(passport) {
  // Stratégie Local pour les utilisateurs
  passport.use(
    'local',
    new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
      try {
        // Rechercher l'utilisateur par email
        const user = await User.findOne({ email });

        if (!user) {
          return done(null, false, { message: "Cet email n'est pas enregistré" });
        }

        // Vérifier le mot de passe
        const isMatch = await bcrypt.compare(password, user.password);

        if (isMatch) {
          return done(null, user);
        } else {
          return done(null, false, { message: 'Mot de passe incorrect' });
        }
      } catch (err) {
        return done(err);
      }
    })
  );

  // Stratégie Local pour les compagnies
  passport.use(
    'local',
    new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
      try {
        // Rechercher la compagnie par email
        const company = await Company.findOne({ email });

        if (!company) {
          return done(null, false, { message: "Cet email n'est pas enregistré" });
        }

        // Vérifier le mot de passe
        const isMatch = await bcrypt.compare(password, company.password);

        if (isMatch) {
          return done(null, company);
        } else {
          return done(null, false, { message: 'Mot de passe incorrect' });
        }
      } catch (err) {
        return done(err);
      }
    })
  );

  // Sérialiser l'utilisateur ou la compagnie dans la session
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  // Désérialiser l'utilisateur ou la compagnie à partir de la session
  passport.deserializeUser(async function(id, done) {
    try {
      const user = await User.findById(id);
  
      if (user) {
        done(null, user);
      } else {
        const company = await Company.findById(id);
        done(null, company);
      }
    } catch (err) {
      done(err);
    }
  });
  
};
