const route = require("express").Router();

const authenticate = require("../../middleware/authenticate");
const {
  getAllCart,
  getByIdCart,
  addCart,
} = require("../controller/cart.controller");

route.use(authenticate);
route.route("/").get(getAllCart);
route.route("/:id").get(getByIdCart);
route.route("/addRemove/:id").get(addCart);

module.exports = route;
