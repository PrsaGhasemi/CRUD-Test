const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
//------------------------------------
const User = require('../Model/User');
const {
    findByEmail,findByVerificationCode
} = require('../Services/services');
const {
    sendMail
} = require('../Utils/mailer');
exports.createUser = async (req, res, next) => {
    const {
        firstName,
        lastName,
        email,
        password
    } = req.body
    try {
        const user = await findByEmail();
        if (user) {
            const error = new Error("user already exists");
            error.statusCode = 421;
            throw error
        } else {
            const verificationCode = Math.floor(Math.random() * 10000)
            console.log(verificationCode);
            await sendMail(email , `your verification code is ${verificationCode}, enter it to activate your account`);
            const encryptedPass = await bcrypt.hash(password, 10)
            console.log(encryptedPass);
            await User.create({
                firstName,
                lastName,
                email,
                password: encryptedPass,
                role: "operator",
                status: "pending",
                confirmationCode: verificationCode
            })
            res.status(200).json({
                message: "user created succesfully, head him into verify page!"
            })
        }
    } catch (err) {
        next(err)
    }
}


exports.verifyEmail = async (req,res,next) => {
    const {verificationCode} = req.body
    try {
        const pendingUser = findByVerificationCode()
        if(!pendingUser) {
            const error = new Error("This user doesnt exist!")
            error.statusCode = 421;
            throw error
        } else {
            
        }
    } catch (err) {
        next(err)
    }   
}