const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
//------------------------------------
const User = require('../Model/User');
const {
    findByEmail,
    findByVerificationCode
} = require('../Services/services');
const {
    sendMail
} = require('../Utils/mailer');
const { findByIdAndDelete, findOneAndDelete } = require('../Model/User');

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
            const confirmationCode = Math.floor(Math.random() * 10000)
            console.log(confirmationCode);
            await sendMail(email, `your verification code is ${confirmationCode}, enter it to activate your account`);
            const encryptedPass = await bcrypt.hash(password, 10)
            await User.create({
                firstName,
                lastName,
                email,
                password: encryptedPass,
                role: "operator",
                status: "pending",
                confirmationCode
            })
            res.status(200).json({
                message: "user created succesfully, head him into verify page!"
            })
        }
    } catch (err) {
        next(err)
    }
}

exports.verifyEmail = async (req, res, next) => {
    const {
        confirmationCode
    } = req.body
    try {
        const user = await User.findOne({
            confirmationCode
        })
        if (!user) {
            const error = new Error("user doesnt exist!")
            error.statusCode = 421;
            throw error
        } else {
            user.status = "active";
            await user.save()
            res.status(200).json({
                message: "user verified succesfuly"
            })
        }
    } catch (err) {
        next(err)
    }
}

exports.handleLogin = async (req, res, next) => {
    const {
        email,
        password
    } = req.body;
    const jwtSecret = process.env.JWT_SECRET;
    try {
        const user = await User.findOne({
            email
        })
        if (!user) {
            const error = new Error("user doesnt exist!")
            error.statusCode = 421;
            throw error
        }
        if (user.status == "pending") {
            const error = new Error("user isnt activated yet!")
            error.statusCode = 421;
            throw error
        }
        const passwordValidation = await bcrypt.compare(password, user.password)
        if (!passwordValidation) {
            const error = new Error("email or password is wrong!")
            error.statusCode = 421;
            throw error
        } else {
            const token = jwt.sign({
                userId: user._id,
                userRole: user.role
            }, jwtSecret, {
                expiresIn: "1h"
            });
            user.token = token
            res.status(200).json({
                message: "user loged in succesfuly",
                token,
                userId: user._id.toString(),
                userRole: user.role
                
            })
        }
    } catch (err) {
        next(err)
    }
}

exports.deleteUser = async (req,res,next) => {
    const user = await User.findById(req.params.id);
    try {
        if(!user) {
            const error = new Error("user deosnt exist to delete!")
            error.statusCode = 404 ;
            throw error
        } if(user.id == req.userId || (req.userRole == "admin" && user.role !== "admin")) {
            await User.findOneAndDelete(user)
            res.status(200).json({message: "user deleted succesfuly"})
        } else {
            const error = new Error("you dont have permission!")
            error.statusCode = 401 ;
            throw error
        }
    } catch (err) {
        next(err)
    }
}

exports.listAllUsers = async (req,res,next) => {
    try {
        if(req.userRole !== "admin") {
            const error = new Error("only admins can do this!")
            error.statusCode = 404
            throw error
        }
        const allUsers = await User.find({}).sort({
            createdAt: "desc"
        })
        res.status(200).json(allUsers)
    } catch (err) {
        next(err)        
    }
}

exports.editUser = async (req,res,next) => {
    const {firstName,lastName,password,role} = req.body;
    try {
        const user = await User.findById(req.params.id)
        if(!user) {
            const error = new Error("user doesnt exist!")
            error.statusCode = 404
            throw error
        } if(req.userId == user._id || (req.userRole == "admin" & user.role !== "admin")) {
            user.firstName = firstName,
            user.lastName = lastName,
            user.password = await bcrypt.hash(password,10),
            user.role = "operator"
            await user.save()
            if(req.userRole == "admin" & user.role !== "admin") {
                user.role = role
                await user.save()
            }
            res.status(200).json({message: "user edited successfuly"})
        } else {
            const error = new Error("you are unable to edit this user!");
            error.statusCode = 401;
            throw error
        }
    } catch (err) {
        next(err)
    }
}