const Product = require("../models/product");

exports.getAllProducts = (req, res, next) => {
  Product.find()
    .then((products) => {
      if (products) {
        res.status(200).json({
          message: "Fetched products successfully.",
          products: products,
        });
      }

      const error = new Error("Could not find products.");
      error.statusCode = 404;

      throw error;
    })
    .catch((err) => {
      next(err);
    });
};

exports.getProduct = (req, res, next) => {
  const id = req.params.id;
  Product.findById(id)
    .then((prod) => {
      if (prod) {
        res.status(200).json({ message: "Product fetched.", product: prod });
      }
      const error = new Error("Could not find product.");
      error.statusCode = 404;
      throw error;
    })
    .catch((err) => {
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

exports.updateProduct = (req, res, next) => {
  const id = req.params.id;

  const name = req.body.name;
  const price = req.body.price;
  const quantity = req.body.quantity;

  Product.findById(id)
    .then((prod) => {
      if (!prod) {
        const error = new Error("Could not find product.");
        error.statusCode = 404;
        throw error;
      }

      prod.name = name;
      prod.price = price;
      prod.quantity = quantity;
      return prod.save();
    })
    .then((result) => {
      res.status(200).json({ message: "Product updated!", product: result });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.deleteProduct = (req, res, next) => {
  const id = req.params.id;
  Product.findById(id)
    .then((prod) => {
      if (prod) {
        return Product.findByIdAndRemove(id);
      }
      const error = new Error("Could not find product.");
      error.statusCode = 404;
      throw error;
    })
    .then((result) => {
      console.log(result);
      res.status(200).json({ message: "Deleted product." });
    })
    .catch((err) => {
      next(err);
    });
};
