const express = require("express");
const cookieParser = require("cookie-parser");
const csrf = require("csurf");
const { urlencoded } = require("express");
const app = express();
const port = process.env.PORT || 3000;

app.set("view engine", "pug");
app.use(cookieParser());
app.use(express.urlencoded());
const csrfProtection = csrf({ cookie: true});
app.use(csrfProtection())

const users = [
  {
    id: 1,
    firstName: "Jill",
    lastName: "Jack",
    email: "jill.jack@gmail.com"
  }
];

app.get("/", (req, res) => {
  res.render("index", {users});
});

app.get("/create", (req, res) => {
  res.render("create", {title: "create"})
})
app.listen(port, () => console.log(`Example app listening on port ${port}!`));

module.exports = app;
