const express = require("express");
const route = express.Router();
const UserRoute = require("./user.route");

route.use("/v1/user", UserRoute);

module.exports = route;
