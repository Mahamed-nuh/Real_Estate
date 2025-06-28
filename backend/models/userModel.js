const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');



const Schema = mongoose.Schema;

const userScema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },

});

// static signup method
userScema.statics.signup = async function (firstName, lastName, email, password) {
    // validation
    if (!email || !password || !firstName || !lastName)  {
        throw Error('All fields must be filled');
    }
    if (!validator.isEmail(email)) {
        throw Error('Email is not valid');
    }
    if (!validator.isStrongPassword(password)) {
        throw Error('Password is not strong enough');
    }
    if (password.length < 6) {
        throw Error('Password must be at least 6 characters long');
    }


    // check if user already exists
    const exists = await this.findOne({ email });
    if (exists) {
        throw Error('Email already in use');
    }



    // hash password
     const salt = await bcrypt.genSalt(10);
     const hash = await bcrypt.hash(password, salt);

     // create user
     const user = await this.create({ firstName, lastName, email, password: hash })
     return user;
     

};

module.exports = mongoose.model('User', userScema);