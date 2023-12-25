const express = require('express');
const userRouter = require('./routes/userRoutes');
const app = express();

app.use('/users', userRouter);

app.get('/', (req, res) => {
})

app.listen(3000, () => {
    console.log(`Server started on port 3000`);
});