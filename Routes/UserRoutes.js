const express = require('express');
const { UserModel } = require('../Models/UserModel');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userRouter = express.Router();


userRouter.post("/register", async (req, res) => {

    const { name, email, gender, password, city, is_married } = req.body

    try {
        bcrypt.hash(password, 5, async (err, hash) => {

            if (err) {
                console.log('err:', err)
            }
            else {
                const user = new UserModel({ name, email, gender, password: hash, city, is_married });
                await user.save();
                res.status(200).send({ "msg": "User Registered" });
            }
        });
    } catch (error) {
        console.log('error:', error);
        res.status(400).send({ "msg": "Register Failed" })
    }

});


userRouter.post("/login", async (req, res) => {

    const { email, password } = req.body;

    try {
        const user = await UserModel.findOne({ email });
        console.log('user:', user);

        if (user) {

            bcrypt.compare(password, user.password, (err, result) => {
                if (result) {
                    var token = jwt.sign({ "userID": user._id }, 'masai');
                    res.status(200).send({ "msg": "Login Successfull", "token": token });
                }
                else {
                    res.status(400).send({ "msg": "Wrong Credentials" })
                }
            });
        }
        else {
            res.status(400).send({ "msg": "Wrong Credentials" })
        }
    } catch (error) {
        console.log('error:', error);
        res.status(400).send({ "msg": error.message })
    }
});


module.exports = {
    userRouter
}


