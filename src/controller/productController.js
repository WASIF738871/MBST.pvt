const mongoose = require('mongoose')
const productModel = require('../model/productModel');
const userModel = require('../model/userModel');

const sales = async function (req, res) {
    try {
        let productData = req.body;
        let { name, quantity, amount } = productData
        let date = new Date();
        productData.soledAt = date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear()
        if (Object.keys(req.body).length == 0) {
            return res.status(400).send({ status: false, message: "please enter data in request body" })
        }
        if (!name) {
            return res.status(400).send({ status: false, message: "please enter name" })
        }
        let checkUniqueName = await productModel.findOne({ name: name })
        if (checkUniqueName) {
            return res.status(400).send({ status: false, message: "This name is already used" })
        }

        if (!quantity) {
            return res.status(400).send({ status: false, message: "please enter quantity" })
        }
        if (typeof quantity != "number") {
            return res.status(400).send({ status: false, message: "please enter quantity in digits" })
        }

        if (!amount) {
            return res.status(400).send({ status: false, message: "please enter amount" })
        }
        if (typeof amount != "number") {
            return res.status(400).send({ status: false, message: "please enter amount in digits" })
        }
        let product = await productModel.create(productData);
        return res.status(201).send({ status: true, message: "Product is created successfully", product })
    } catch (err) {
        return res.status(500).send({ status: false, message: err.message })
    }

}
const getSales = async function (req, res) {
    try {
        let userId = req.params.userId
        let { topItem } = req.body

        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).send({ status: false, message: "UserId is invalid" })
        }
        let userPresent = await userModel.findById(userId)
        if (!userPresent) {
            return res.status(400).send({ status: false, message: "There is no such user found" })
        }
        if (userId != req.userId) {
            return res.status(403).send({ status: false, message: "Unauthorized Access" });
        }

        if (topItem != null) {
            if (typeof topItem != "number") {
                return res.status(400).send({ status: false, message: "please enter topeItem in Number" })
            }
        }
        let yourProduct = []
        let product = await productModel.find().sort({ quantity: -1 });
        if (topItem) {
            if (topItem > product.length) {
                return res.status(400).send({ status: false, message: "please put appropriate number to search" })
            }
            for (let item = 0; item < topItem; item++) {
                yourProduct.push(product[item])
            }
        } else {
            yourProduct = product
        }

        return res.status(200).send({ status: true, message: "sales detail", yourProduct })
    } catch (err) {
        return res.status(500).send({ status: false, message: err.message })
    }

}


const todayNewRev = async function (req, res) {
    try {
        let userId = req.params.userId
        let { soledAt } = req.body;
        
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).send({ status: false, message: "UserId is invalid" })
        }
        let userPresent = await userModel.findById(userId)
        if (!userPresent) {
            return res.status(400).send({ status: false, message: "There is no such user found" })
        }
        if (userId != req.userId) {
            return res.status(403).send({ status: false, message: "Unauthorized Access" });
        }

        if (soledAt) {
            date = { soledAt: soledAt }
        } else {
            date = undefined
        }
        let todaySale = await productModel.find(date)
        if (todaySale.length == 0) {
            return res.status(400).send({ status: false, message: "There is no revenue on this date" })
        }
        let totalSale = 0;
        for (let i = 0; i < todaySale.length; i++) {
            totalSale += todaySale[i].amount
        }
        return res.status(200).send({ status: true, totalSale: "Total sale is " + totalSale + " Rs On this Date" })
    } catch (err) {
        return res.status(500).send({ status: false, message: err.message })
    }
}

module.exports = {
    sales,
    getSales,
    todayNewRev
}