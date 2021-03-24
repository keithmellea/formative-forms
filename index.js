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
app.listen(port, () => console.log(`Example app listening on port ${port}!`));

module.exports = app;
