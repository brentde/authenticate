const bcrypt = require('bcrypt');
const express = require('express');
const router = express.Router();
const User = require('../User');

router.route('/login').get((req, res) => {
  const username = req.query.username;
  const password = req.query.password;

  User.findOne({username: username}, (err, user) => {
    if(err) res.status(400).send("Invalid username.");
    if(!user) res.status(400).send("There was an error retrieve the user.")
    if(bcrypt.compareSync(password, user.password))
      res.status(200).send("Login Successful!");
    else
      res.status(400).send("Invalid password");
  })
})

module.exports = router;
