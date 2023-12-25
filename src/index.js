const express = require('express');
const userRouter = require('./routes/userRoutes');
const app = express();
const mongoose = require('mongoose');

app.use(express.json());

app.use('/users', userRouter);

app.get('/', (req, res) => {
    res.send('Hello');
})

mongoose.connect('mongodb+srv://admin:ramanuj@cluster0.5awwtbg.mongodb.net/')
    .then(() => {
        app.listen(3000, () => {
            console.log('Server started on port 3000');
        });
    })
    .catch((error) => {
        console.log(error);
    })