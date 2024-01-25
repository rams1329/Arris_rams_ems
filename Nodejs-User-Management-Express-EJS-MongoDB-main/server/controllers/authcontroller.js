// authcontroller.js

const { AUTH_USERNAME, AUTH_PASSWORD } = process.env;

const authController = {
  loginForm: (req, res) => {
    res.render("login", { user: req.session.user }); // Pass the user variable to the template
  },

  login: (req, res) => {
    const { username, password } = req.body;

    if (username === AUTH_USERNAME && password === AUTH_PASSWORD) {
      // User is authenticated, allow access
      req.session.user = { username: AUTH_USERNAME };
      req.flash("success", "Login successful");
      res.redirect("/");
    } else {
      req.flash("error", "Invalid username or password");
      res.redirect("/login");
    }
  },

  logout: (req, res) => {
    req.session.destroy();
    res.redirect("/");
  },
};

module.exports = authController;
