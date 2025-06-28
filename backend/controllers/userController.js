const User = require('../models/userModel');
const jwt = require('jsonwebtoken');



// Create a JWT token
const createToken = (_id) => {
    return jwt.sign({_id}, process.env.SECRET, { expiresIn: '3d' });
}



// Login user
const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try{
        const user = await User.login(email, password);
        // Create a token
        const token = createToken(user._id);
        res.status(200).json({ email: user.email, firstName: user.firstName, lastName: user.lastName, token });
    }
    catch (error) {
        console.error(error);
        res.status(400).json({ error: error.message });

    } }


// Signup user
const signupUser = async (req, res) => {
    const { email, password, firstName, lastName } = req.body;

    try {
        const user = await User.signup(firstName, lastName, email, password)
        // Create a token
        const token = createToken(user._id);


        res.status(201).json({ email: user.email, firstName: user.firstName, lastName: user.lastName, token });
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: error.message });
    }
}


module.exports = {
    loginUser,
    signupUser
};