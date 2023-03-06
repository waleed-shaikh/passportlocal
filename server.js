const express = require("express");
require("dotenv").config();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
const userRoute = require("./routes/userRoute");
const passport = require("passport");
const flash = require('connect-flash');

//mongodb
const dbConfig = require("./config/dbConfig");
//------------------- END MONGODB ------------------

//Middleware
const app = express();
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));
app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true,
}));
app.use(express.urlencoded({extended: true}))
app.use(cookieParser('secret'));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
//------------------- END OF MIDDLEWARE ------------------

//Routes
app.use("/api/users", userRoute);
//------------------- END OF Routes ------------------


//Starting Server
// const port = process.env.PORT || 5000;

app.listen(4000, () => {
  console.log(`Server listening on port ${4000}`);
});
