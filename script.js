const express = require('express');
const mongoose = require("mongoose");
const app = express();
const z = require('zod'); // input validation
const jwt = require('jsonwebtoken'); // authentication
const jwtPassword = "Developers#123456";

app.use(express.json());

mongoose.connect('mongodb+srv://admin:ramanuj@cluster0.5awwtbg.mongodb.net/');

const User = mongoose.model('Users', { name: String, email: String, password: String });

const user = new User({
    name: 'Ramanuj Jindal', 
    email: "ramanuj0705@gmail.com", 
    password: 'dev'
});

user.save()

const userExists = (username, password) => {
    // it should check in the database
    const userExists = false;

    ALL_USERS.find(it => it.username === username && it.password === password) ? userExists = true : false;
    return userExists;
}

app.post('/signin', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    if(!userExists(username, password)) {
        res.status(403).json({
            msg: "User does not exist in our in-memory db"
        })
    }

    const token = jwt.sign({username: username}, jwtPassword);

    return res.json({
        token
    })
    
});

app.get('/users', (req, res) => {
    const token = req.headers.authorization;
    const decoded = jwt.verify(token, jwtPassword);
    const username = decoded.username;

    res.json({
        users: ALL_USERS.filter((value) => {
            if(value.username === username) {
                return false;
            }
            else {
                return true;
            }
        })
    })
});