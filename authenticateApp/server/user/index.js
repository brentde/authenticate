const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const UserSchema = require('./User');
const User = mongoose.model('User', UserSchema);
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../config.json')

/* User routes */
router.route('/register').post((req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  /* Check to see if the username is taken */
  User.findOne({username: username}, (err, user) => {
    /* If a user is foumd, then fail */
    if(user){
      res.status(401).send({field: 'username'});
      /* Else, created a new hashed password and add the user to the db */
    } else {
        bcrypt.hash(password, 10, (err , hash) => {
        var user = new User({username: username, hashedPassword: hash, role: "admin"});
  
        user.save((err, success) => {
            if(err) res.status(500).send({message: "Something went wrong. Please contanct a system administrator."});
            if(success) res.status(200).send({message: "User registration successful!"});
        });
      });
    }
  })
})

router.route('/login').get((req, res) => {
  const username = req.query.username;
  const password = req.query.password;

  User.findOne({username: username}, (err, user) => {
    if(err) res.status(400).send(err);
  
    if(user){
      if(bcrypt.compareSync(password, user.hashedPassword)){
        let token = {
          token: jwt.sign(user.username, config.jwtKey),
          username: username
        };

        res.status(200).send({token: token});
      } else {
        res.status(401).send("Invalid password");
      }
    } else {
      res.status(400).send("There was an error retrieving the user.")
    }
  })
})

module.exports = {
  auth: (req, res, next) => {
    try{
      const tokenObj = JSON.parse(req.headers.authorization);
      const username = tokenObj.username;
      const token = tokenObj.token;
    
      if(token && username){
        if(username === jwt.verify(token, config.jwtKey)){
          next();
        } else {
          throw "Authorization Failed!";
        }
      }
    }
    catch {
      res.status(401).json({
      error: new Error("Authorization Failed!")
      })
    }
  },

  authRoutes: router
}