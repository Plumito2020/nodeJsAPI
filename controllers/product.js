const Product = require("../models/product");

exports.getAllProducts = (req, res, next) => {
  Product.find()
    .then((products) => {
      res
        .status(200)
        .json({
          message: "Fetched products successfully.",
          products: products,
        });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.addProduct = (req, res, next) => {
  const name = req.body.name;
  const price = req.body.price;
  const quantity = req.body.quantity;
  const product = new Product({
    name: name,
    price: price,
    quantity: quantity,
  });
  product
    .save()
    .then((result) => {
      res.status(201).json({
        message: "Product created successfully!",
        post: result,
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};
