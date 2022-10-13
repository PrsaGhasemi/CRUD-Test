const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, "first name is required"],
        trim: true,
        minlength: [3, "first name is less than min amount"],
        maxlength: [50, "fist name is more than max amount"]
    },
    lastName: {
        type: String,
        required: [true, "last name is required"],
        trim: true,
        minlength: [4, "last name is less than min amount"],
        maxlength: [50, "last name is more than max amount"]
    },
    email: {
        type: String,
        required: [true, "email is required"],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "password is required"],
        minlength: [4, "password is less than min amount"],
        maxlength: [100, "password is more than max amount"]
    },
    role: {
        type: String,
        default: "operator",
        enum: ["admin", "operator"]
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    status: {
        type: String,
        default: "pending",
        enum: ["pending", "active"]
    },
    confirmationCode: {
        type: String,
        unique: true,
    }
})


module.exports = mongoose.model("User", userSchema)