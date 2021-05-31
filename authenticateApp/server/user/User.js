const mongoose = require('mongoose');

module.exports = new mongoose.Schema({
    username: String,
    hashedPassword: String,
    role: String
});

