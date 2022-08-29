const express = require('express');
const productController = require('../controller/productController');
const userController = require('../controller/userController');
const middleware = require('../middleware/auth')

const router = express.Router();
///-------userAPIs
router.post("/register",userController.creatUser);
router.post("/login",userController.userLogin);

//sales APIs
router.post("/sales",middleware.authentication,productController.sales);
router.get("/getSales/:userId",middleware.authentication,productController.getSales);
router.get("/newRevenue/:userId",middleware.authentication,productController.todayNewRev);


module.exports=router;