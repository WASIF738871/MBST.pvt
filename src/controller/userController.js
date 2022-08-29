const jwt = require('jsonwebtoken')
const userModel =require('../model/userModel')

const creatUser = async function(req,res){
    try {
        let userData = req.body;
        let{userName,email,password} = userData
        if (Object.keys(req.body).length == 0) {
            return res.status(400).send({ status: false, message: "please enter data in request body" })
        }
        if (!userName) {
            return res.status(400).send({ status: false, message: "please enter userName" })
        }
        if (!email) {
            return res.status(400).send({ status: false, message: "please enter email" })
        }
        let checkUniqueEmail = await userModel.findOne({email:email})
        if (checkUniqueEmail) {
            return res.status(400).send({ status: false, message: "This email is already used" })
        }
        if (!password) {
            return res.status(400).send({ status: false, message: "please enter password" })
        }
        let userDetail = await userModel.create(userData);
        return res.status(201).send({status: true, message: "user details are created successfully",userDetail})
    } catch (err) {
        return res.status(500).send({status: false, message:err.message})
    }
    
}

const userLogin = async function (req, res) {
    try {
        let { email, password } = req.body;

        if (Object.keys(req.body).length == 0) {
            return res.status(400).send({ status: false, message: "please enter data in request body" })
        }

        if (!email) {
            return res.status(400).send({ status: false, message: "please enter email" })
        }

        if (!password) {
            return res.status(400).send({ status: false, message: "please enter password " })
        }

        let user = await userModel.findOne({ email: email, password: password });
        if (!user) {
            return res.status(400).send({ status: false, message: "email or password is incorrect " })
        }

        let token = jwt.sign(
            {userId: user._id.toString()},
            "MBST.pvt-task"
        )
        return res.status(200).send({ status: true, message: "you are successfully loggedin", data: token })
    } catch (err) {
        return res.status(500).send({ status: false, message: err.message })
    }
}


module.exports= {
    creatUser,
    userLogin
}