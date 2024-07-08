const express = require("express");
const route = express.Router();
const UserRoute = require("./user.route");
const ProductRoute = require("./product.route");

route.use("/v1/user", UserRoute);
route.use("/v1/product", ProductRoute);

module.exports = route;
