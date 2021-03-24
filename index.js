const express = require("express");
const cookieParser = require("cookie-parser");
const csrf = require("csurf");
const { urlencoded } = require("express");
const app = express();
const port = process.env.PORT || 3001;

app.set("view engine", "pug");
app.use(cookieParser());
app.use(express.urlencoded());
const csrfProtection = csrf({ cookie: true});
// app.use(csrfProtection())

const users = [
  {
    id: 1,
    firstName: "Jill",
    lastName: "Jack",
    email: "jill.jack@gmail.com"
  }
];

app.get("/", csrfProtection, (req, res) => {
  res.render("index", {users});
});

app.get("/create", csrfProtection, (req, res) => {
  res.render("create", {title: "create", csrfToken: req.csrfToken(), errors: []});
})

const validateUser = (req, res, next) => {
  const { firstName, lastName, email, password, confirmedPassword } = req.body;
  const errors = [];
  if (!firstName) {
    errors.push("Please provide a first name.");
  }
  if (!lastName) {
    errors.push("Please provide a last name.");
  }
  if (!email) {
    errors.push("Please provide an email.");
  }
  if (!password) {
    errors.push("Please provide a password.");
  }
  if (password && password !== confirmedPassword) {
    errors.push(
      "The provided values for the password and password confirmation fields did not match."
    );
  }

  req.errors = errors;

  next();
};

app.post("/create", csrfProtection, validateUser, (req, res) => {
  const { firstName, lastName, email, password, confirmedPassword } = req.body;

  if (req.errors.length > 0) {
    res.render("create", {
      title: "create",
      errors: req.errors,
      email,
      firstName,
      lastName
    });
    return;
  }
  const user = {
    id: users.length + 1,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password,
    confirmedPassword: req.body.confirmedPassword,
  };
  users.push(user);
  res.redirect("/");
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

module.exports = app;
