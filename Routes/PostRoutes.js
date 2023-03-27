const express = require("express");
const { PostModel } = require("../Models/PostModel");

const postRouter = express.Router();


postRouter.get("/", async (req, res) => {

    try {
        const posts = await PostModel.find();
        res.status(200).send(posts);

    } catch (error) {
        console.log('error:', error);
        res.status(400).send({ "msg": error.message })
    }
});


postRouter.post("/add", async (req, res) => {

    let payload = req.body;

    try {
        let post = new PostModel(payload);
        await post.save();
        res.status(200).send({ "msg": "Post will be added" })
    } catch (error) {
        console.log('error:', error);
        res.status(400).send({ "msg": error.message })
    }
})

postRouter.patch("/update/:id", async (req, res) => {

    let payload = req.body;
    let { id } = req.params;
    let post = await PostModel.findOne({ "_id": id });
    let userId_post = post.userID;
    let userIdreq = req.body.userID;
    try {

        if (userId_post === userIdreq) {
            await PostModel.findByIdAndUpdate({ "_id": id }, payload);
            res.status(200).send({ "msg": "Posts will be updated" })
        }
        else {
            res.status(400).send({ "msg": "You are not authorised for updating the posts" })
        }

    } catch (error) {
        console.log('error:', error);
        res.status(400).send({ "msg": error.message })
    }
});

postRouter.delete("/delete/:id", async (req, res) => {

    let { id } = req.params;
    let post = await PostModel.findOne({ "_id": id });
    let userId_post = post.userID;
    let userIdreq = req.body.userID;
    try {

        if (userId_post === userIdreq) {
            await PostModel.findByIdAndDelete({ "_id": id });
            res.status(200).send({ "msg": "Posts will be deleted" })
        }
        else {
            res.status(400).send({ "msg": "You are not authorised for deleting the posts" })
        }

    } catch (error) {
        console.log('error:', error);
        res.status(400).send({ "msg": error.message })
    }
});



module.exports = {
    postRouter
}