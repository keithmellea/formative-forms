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

app.get("/create", (req, res) => {
  res.render("create", {title: "create"})
})

const validateUser = (req, res, next) => {
  const { firstName, lastName, email, password, confirmedPassword } = req.body;
  const errors = [];
  if (!firstName) {
    errors.push("Please fill out the first name field");
  }
  if (!lastName) {
    errors.push("Please fill out the last name field");
  }
  if (!email) {
    errors.push("Please fill out the email field");
  }
  if (!password) {
    errors.push("Please fill out the password field");
  }
  if (!confirmedPasword) {
    errors.push("Please fill out the confirmed password field");
  }

  req.errors = errors;

  next();
};

app.post("/create", csrfProtection, validateUser, (req, res) => {
  const { firstName, lastName, email, password, confirmedPassword } = req.body;

  if (req.errors.length > 0) {
    res.render("create", {
      title: "create",
      errors,
      email,
      firstName,
      lastName,
      password,
      confirmedPassword,
    });
    return;
  }
  const user = {
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
