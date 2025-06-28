const User = require('../models/userModel');



// Login user
const loginUser = async (req, res) => {
    res.json({ message: 'Login route' });
}


// Signup user
const signupUser = async (req, res) => {
    const { email, password, firstName, lastName } = req.body;

    try {
        const user = await User.signup(firstName, lastName, email, password)

        res.status(201).json({ email: user.email, firstName: user.firstName, lastName: user.lastName });
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: error.message });
    }
}


module.exports = {
    loginUser,
    signupUser
};