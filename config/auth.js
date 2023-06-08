module.exports = {
  ensureAuthenticated: (req, res, next) => {
    if (req.isAuthenticated()) {
      return next();
    }
    req.flash('error_msg', 'Veuillez vous connecter pour voir cette page');
    res.redirect('/users/login');
  },
  ensureCompanyAuthenticated: (req, res, next) => {
    if (req.isAuthenticated()) {
      return next();
    }
    req.flash('error_msg', 'Veuillez vous connecter en tant que compagnie pour voir cette page');
    res.redirect('/company/login');
  },
  forwardAuthenticated: (req, res, next) => {
    if (!req.isAuthenticated()) {
      return next();
    }
    res.redirect('/users/dashboard');
  },
  forwardCompanyAuthenticated: (req, res, next) => {
    if (!req.isAuthenticated()) {
      return next();
    }
    res.redirect('/company/dashboard');
  }
};
