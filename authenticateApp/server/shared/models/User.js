const mongoose = require('mongoose');
const crypto = require('crypto');
const config = require('../config.json')

var User = new mongoose.Schema({
    username: String,
    hashedPassword: String,
    role: String
});

User.method(
  'verifyPassword', (password) => {
    var ciphertext = CryptoJS.AES.encrypt(password, config.key).toString();
    if(cipherText == this.User.hashedPassword) return true;
    return false;
  })

/* Export User object */
module.exports = User;
