const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const authRoutes = require('./auth/index');
const UserSchema = require('./User');
const User = mongoose.model('User', UserSchema);
const bcrypt = require('bcrypt');

/* Auth routes */
router.route('/auth').all(authRoutes);

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
        var user = new User();
        user.username = username;
        user.hashedPassword = hash;
        user.role = 'admin';

        user.save((err, success) => {
            if(err) res.status(500).send({message: "Something went wrong. Please contanct a system administrator."});
            if(success) res.status(200).send({message: "User registration successful!"});
        });
      });
    }
  })

})

module.exports = router;
