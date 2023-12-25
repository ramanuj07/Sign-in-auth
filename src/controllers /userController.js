const userModel = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const SECRET_KEY = "DeveloperCommunity#123";

const signup = async (req, res) => {
    const { username, email, password} = req.body;

    try{

        // for checking if the user exists already or not
        const existingUser = await userModel.findOne({email: email});
        if(existingUser) {
            return res.status(400).json({message: "User already exists"});
        }

        // for hashing the password using bcrypt 
        const hashedPassword = await bcrypt.hash(password, 13);

        // user generation
        const userCreate = await userModel.create({
            username: username, 
            email: email, 
            password: hashedPassword
        });

        // for generating tokens using jwt 
        const token = jwt.sign({email: userCreate.email, id: userCreate._id}, SECRET_KEY);
        res.status(201).json({user: userCreate, token: token});

    } catch(error) {
        console.log(error);
        res.status(500).json({message: "Something went wrong"});
    }

}

const signin = async (req, res) => {
    const {email, password} = req.body;

    try{
        // for checking if the user exists already or not
        const existingUser = await userModel.findOne({ email: email });
        if (!existingUser) {
            return res.status(404).json({ message: "User not found" });
        }

        const matchPassword = await bcrypt.compare(password, existingUser.password)

        if(!matchPassword) {
            return res.status(400).json({message: "Invalid credentials"});
        }

        const token = jwt.sign({ email: existingUser.email, id: existingUser._id }, SECRET_KEY);
        res.status(201).json({ user: existingUser, token: token });

    } catch(error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong" });
    }
}

module.exports = { signup, signin };