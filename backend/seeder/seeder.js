
import mongoose from 'mongoose';
import Product from '../models/product.js';    
import products from './data.js';

const seedProducts = async () => {
    try{
        await mongoose.connect("mongodb://localhost:27017/unity-stack-solutions");
        await Product.deleteMany();
        console.log('Products are deleted');

        await Product.insertMany(products);
        console.log('All products are added');

        process.exit();

    } catch (error) {
        console.log(error.message);
        process.exit();
    }
}

seedProducts();