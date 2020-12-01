const express = require("express");
const productController = require("../controllers/product");

const router = express.Router();

// GET /products
router.get("/products", productController.getAllProducts);

// POST / products

router.post("/products", productController.addProduct);

//Exporting the router
module.exports = router;
