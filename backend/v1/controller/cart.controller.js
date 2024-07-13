const constants = require("../../config/constants");
const Cart = require("../../models/cart.model");
const Product = require("../../models/product.model");
const { sendResponse } = require("../../services/common.services");
const { ObjectId } = require("mongodb");

const getAllCart = async (req, res, next) => {
  try {
    let { limit, page, sortBy, search } = req.query;

    if (limit) {
      limit = +limit || constants.LIMIT;
    }
    if (page) {
      page = +page || constants.PAGE;
    }

    let query = {};
    let field = "created_at",
      value = 1;
    query.user_id = req.user._id;
    const total = await Cart.countDocuments(query);

    if (total === 0) {
      return sendResponse(
        res,
        constants.WEB_STATUS_CODE.OK,
        constants.STATUS_CODE.SUCCESS,
        "GENERAL.GET_LIST",
        { data: null, total, limit, page },
        req.headers.lang
      );
    }
    const pipeline = [{ $match: query }];

    if (limit && page) {
      pipeline.push({ $skip: (page - 1) * limit }, { $limit: limit });
    }

    const cart = await Cart.aggregate([
      ...pipeline,
      {
        $lookup: {
          from: "products",
          localField: "product_id",
          foreignField: "_id",
          as: "product_id",
        },
      },
      { $unwind: "$product_id" },
      {
        $lookup: {
          from: "users",
          localField: "user_id",
          foreignField: "_id",
          pipeline: [
            {
              $project: {
                auth_toke: 0,
                reset_token: 0,
                password: 0,
                deleted_At: 0,
                soft_delete: 0,
              },
            },
          ],
          as: "user_id",
        },
      },
      { $unwind: "$user_id" },
    ]);

    return sendResponse(
      res,
      constants.WEB_STATUS_CODE.OK,
      constants.STATUS_CODE.SUCCESS,
      "GENERAL.GET_LIST",
      { data: cart, total, limit: limit || null, page: page || null },
      req.headers.lang
    );
  } catch (err) {
    console.log("Error(getAllCart)..", err);
    return sendResponse(
      res,
      constants.WEB_STATUS_CODE.SERVER_ERROR,
      constants.STATUS_CODE.FAIL,
      "GENERAL.GENERAL_ERROR_CONTENT",
      { message: err.message },
      req.headers.lang
    );
  }
};

const getByIdCart = async (req, res, next) => {
  try {
    const id = req.params.id;

    const cart = await Cart.aggregate([
      { $match: { _id: new ObjectId(id) } },
      {
        $lookup: {
          from: "products",
          localField: "product_id",
          foreignField: "_id",
          as: "product_id",
        },
      },
      { $unwind: "$product_id" },
      {
        $lookup: {
          from: "users",
          localField: "user_id",
          foreignField: "_id",
          pipeline: [
            {
              $project: {
                auth_toke: 0,
                reset_token: 0,
                password: 0,
                deleted_At: 0,
                soft_delete: 0,
              },
            },
          ],
          as: "user_id",
        },
      },
      { $unwind: "$user_id" },
    ]);

    if (cart.length === 0) {
      return sendResponse(
        res,
        constants.WEB_STATUS_CODE.BAD_REQUEST,
        constants.STATUS_CODE.NOT_FOUND,
        "GENERAL.NOT_FOUND",
        null,
        req.headers.lang
      );
    }
    return sendResponse(
      res,
      constants.WEB_STATUS_CODE.OK,
      constants.STATUS_CODE.SUCCESS,
      "GENERAL.GET_LIST",
      cart[0],
      req.headers.lang
    );
  } catch (err) {
    console.log("Error(getByIdCart)..", err);
    return sendResponse(
      res,
      constants.WEB_STATUS_CODE.SERVER_ERROR,
      constants.STATUS_CODE.FAIL,
      "GENERAL.GENERAL_ERROR_CONTENT",
      { message: err.message },
      req.headers.lang
    );
  }
};

const addCart = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return sendResponse(
        res,
        constants.WEB_STATUS_CODE.BAD_REQUEST,
        constants.STATUS_CODE.NOT_FOUND,
        "PRODUCT.PRODUCT_NOT_FOUND",
        null,
        req.headers.lang
      );
    }
    const existingCart = await Cart.findOne({
      product_id: new ObjectId(req.params.id),
    });
    if (existingCart) {
      const deleteCart = await Cart.deleteOne(existingCart._id);
      return sendResponse(
        res,
        constants.WEB_STATUS_CODE.OK,
        constants.STATUS_CODE.SUCCESS,
        "PRODUCT.PRODUCT_REMOVE",
        existingCart,
        req.headers.lang
      );
    } else {
      const cart = await Cart.create({
        product_id: req.params.id,
        user_id: req.user._id,
      });

      return sendResponse(
        res,
        constants.WEB_STATUS_CODE.OK,
        constants.STATUS_CODE.SUCCESS,
        "PRODUCT.PRODUCT_ADD",
        cart,
        req.headers.lang
      );
    }
  } catch (err) {
    console.log("Error(addCart)..", err);
    return sendResponse(
      res,
      constants.WEB_STATUS_CODE.SERVER_ERROR,
      constants.STATUS_CODE.FAIL,
      "GENERAL.GENERAL_ERROR_CONTENT",
      { message: err.message },
      req.headers.lang
    );
  }
};
module.exports = { getAllCart, addCart, getByIdCart };
