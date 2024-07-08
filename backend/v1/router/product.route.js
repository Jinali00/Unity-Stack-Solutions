const express = require("express");
const {
  getAllProduct,
  addProduct,
} = require("../controller/product.controller");
const route = express.Router();

route.route("/").get(getAllProduct).post(addProduct);

module.exports = route;
