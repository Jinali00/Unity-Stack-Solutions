

import Product from '../models/product.js';
import ErrorHandler from '../utils/errorHandler.js';
import catchAsyncErrors from '../middlewares/catchAsyncErrors.js';

// get product => /api/v1/products
export const getProducts = catchAsyncErrors (async (req,res) => {
    const products = await Product.find();
    res.status(200).json({products,});
});


// create new product => /api/v1/admin/products
export const newProduct = catchAsyncErrors (async (req,res) => {
    const product = await Product.create(req.body);
    res.status(200).json({product,});
});


// get single product => /api/v1/products/:id
export const getProductDetails = catchAsyncErrors (async (req,res, next) => {
    const product = await Product.findById(req?.params?.id);
    if(!product)
        {
            return next(new ErrorHandler('Product Not Found',404));
        }
    res.status(200).json({product,});
});

// update product details => /api/v1/products/:id
export const updateProduct = catchAsyncErrors (async (req,res) => {
    let product = await Product.findById(req?.params?.id);
    if(!product)
        {
            return next(new ErrorHandler('Product Not Found',404));
        }
    product = await Product.findByIdAndUpdate(req?.params?.id, req.body, {new:true});
    res.status(200).json({product,});
});

// delete product => /api/v1/products/:id
export const deleteProduct = catchAsyncErrors (async (req,res) => {
    const product = await Product.findById(req?.params?.id);
    if(!product)
        {
            return next(new ErrorHandler('Product Not Found',404));
        }
    
    await product.deleteOne();
    res.status(200).json({message: 'Product deleted'});
});