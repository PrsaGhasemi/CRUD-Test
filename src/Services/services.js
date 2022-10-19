const User = require('../Model/User');
const mongoose = require('mongoose');

exports.findByEmail = async (email) => {
    return User.findOne({email})
}

exports.findByVerificationCode = async (confirmationCode) => {
    return User.findOne({confirmationCode})
}