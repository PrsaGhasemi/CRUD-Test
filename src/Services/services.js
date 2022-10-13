const User = require('../Model/User');
const mongoose = require('mongoose');

export const findByEmail = async (email) => {
    return User.findOne({email})
}