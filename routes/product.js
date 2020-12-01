const express = require("express");
const productController = require("../controllers/product");

const router = express.Router();

// GET /products
router.get("/products", productController.getAllProducts);

// GET /products/id
router.get("/products/:id", productController.getProduct);

// POST /products
router.post("/products", productController.addProduct);

//PUT /products/id
router.put("/products/:id", productController.updateProduct);

//DELETE /products/id
router.delete("/products/:id", productController.deleteProduct);

//Exporting the router
module.exports = router;
