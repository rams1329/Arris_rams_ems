// authMiddleware.js

const checkAuthenticated = (req, res, next) => {
  if (req.session && req.session.user) {
    // User is authenticated, allow access to the next middleware or route handler
    next();
  } else {
    // User is not authenticated, redirect to the login page (adjust the path as needed)
    res.redirect("/login");
  }
};

const checkNotAuthenticated = (req, res, next) => {
  if (!req.session || !req.session.user) {
    // User is not authenticated, allow access to the next middleware or route handler
    next();
  } else {
    // User is already authenticated, redirect to a different page (adjust the path as needed)
    res.redirect("/");
  }
};

module.exports = { checkAuthenticated, checkNotAuthenticated };
