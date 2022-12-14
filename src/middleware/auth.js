const jwt = require("jsonwebtoken");
const authentication = async function (req, res, next) {
    try {
        let tokenWithBearer = req.headers["authorization"];

        if (!tokenWithBearer) {
            return res.status(401).send({ status: false, message: "token not found" });
        }
        let tokenArray = tokenWithBearer.split(" ");

        let token = tokenArray[1];

        let decodedtoken = jwt.verify(token, "MBST.pvt-task", function (err, token) {
            if (err) return false;
            if (token) return token;
        });
        if (!decodedtoken) {
            return res.status(401).send({ status: false, message: "invalid token" });
        }

        req.userId = decodedtoken.userId;

        next();
    } catch (err) {
        return res.status(500).send({ status: false, message: err.message });
    }
};


module.exports = { authentication };