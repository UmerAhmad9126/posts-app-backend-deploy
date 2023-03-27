const express = require('express');
const { connection } = require('./Configs/db');
const { userRouter } = require('./Routes/UserRoutes');
require('dotenv').config();
const cors = require("cors");
const { auth } = require('./Middleware/auth');
const { postRouter } = require('./Routes/PostRoutes');


const app = express();
app.use(express.json());
app.use(cors());

app.use("/users", userRouter);
app.use(auth);
app.use("/posts", postRouter);



app.listen(process.env.PORT, async () => {
    try {
        await connection
        console.log("Connected to mongo")
    } catch (error) {
        console.log('error:', error)
    }

    console.log("Server listening")
})