const mongoose = require("mongoose");
const Product = require("../models/product.model");
const products = require("./data");

const seedProducts = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/unity-stack-solutions");
    await Product.deleteMany();
    console.log("Products are deleted");

    await Product.insertMany(products);
    console.log("All products are added");

    process.exit();
  } catch (error) {
    console.log(error.message);
    process.exit();
  }
};

seedProducts();
