const express = require("express");
const route = express.Router();
const UserRoute = require("./user.route");
const ProductRoute = require("./product.route");
const CartRoute = require("./cart.route");

route.use("/v1/user", UserRoute);
route.use("/v1/product", ProductRoute);
route.use("/v1/cart", CartRoute);

module.exports = route;
