const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {

    const token = req.headers.authorization;

    if (token) {

        const decode = jwt.verify(token, "masai");
        console.log('decode:', decode)

        if (decode) {
            req.body.userID = decode.userID;
            next();
        }
        else {
            res.status(400).send({ "msg": "Login required" })
        }
    }
    else {
        res.status(400).send({ "msg": "Login required" })
    }

}

module.exports = {
    auth
}