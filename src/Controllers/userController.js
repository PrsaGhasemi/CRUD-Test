const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
//------------------------------------
const User = require('../Model/User');
const {findByEmail} = require('../Services/services');

exports.createUser = async (req,res,next) => {
    const {firstName,lastName,email,password} = req.body
    try {
        const user = await findByEmail()
        if(user) {
            const error = new Error("User already exists");
            error.statusCode = 421;
            throw error
        } else {
            
        }
    } catch (err) {
        next(err)
    }
}