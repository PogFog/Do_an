const OrderService = require("../services/OrderService");
const express = require("express");
const router = express.Router();
const dotenv = require("dotenv");
const config = require("config");
const querystring = require("qs");
const crypto = require("crypto");
const { log } = require("console");
const createOrder = async (req, res) => {
  try {
    const addressPayment =
      req.headers["x-forwarded-for"] ||
      req.connection.remoteAddress ||
      req.socket.remoteAddress ||
      req.connection.socket.remoteAddress;
    const {
      paymentMethod,
      itemsPrice,
      shippingPrice,
      totalPrice,
      fullName,
      address,
      city,
      phone,
    } = req.body;
    if (
      !paymentMethod ||
      !itemsPrice ||
      !shippingPrice ||
      !totalPrice ||
      !fullName ||
      !address ||
      !city ||
      !phone
    ) {
      return res.status(200).json({
        status: "ERR",
        message: "The input is required",
      });
    }
    const response = await OrderService.createOrder(req.body);
    let url;
    if (paymentMethod == "paypal") {
      url = await paymentOnline(totalPrice, "Paymentonline", addressPayment);
    }
    console.log("url", url);
    return res.status(200).json({
      status: "OK",
      url: url,
    });
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const getAllOrderDetails = async (req, res) => {
  try {
    const userId = req.params.id;
    if (!userId) {
      return res.status(200).json({
        status: "ERR",
        message: "The userId is required",
      });
    }
    const response = await OrderService.getAllOrderDetails(userId);
    return res.status(200).json(response);
  } catch (e) {
    // console.log(e)
    return res.status(404).json({
      message: e,
    });
  }
};

const getDetailsOrder = async (req, res) => {
  try {
    const orderId = req.params.id;
    if (!orderId) {
      return res.status(200).json({
        status: "ERR",
        message: "The userId is required",
      });
    }
    const response = await OrderService.getOrderDetails(orderId);
    return res.status(200).json(response);
  } catch (e) {
    // console.log(e)
    return res.status(404).json({
      message: e,
    });
  }
};
const deleteManyOrder = async (req, res) => {
  try {
    const ids = req.body.ids;
    if (!ids) {
      return res.status(200).json({
        status: "ERR",
        message: "The ids is required",
      });
    }
    const response = await OrderService.deleteManyOrder(ids);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const cancelOrderDetails = async (req, res) => {
  try {
    const data = req.body.orderItems;
    const orderId = req.body.orderId;
    if (!orderId) {
      return res.status(200).json({
        status: "ERR",
        message: "The orderId is required",
      });
    }
    const response = await OrderService.cancelOrderDetails(orderId, data);
    return res.status(200).json(response);
  } catch (e) {
    // console.log(e)
    return res.status(404).json({
      message: e,
    });
  }
};

const getAllOrder = async (req, res) => {
  try {
    const data = await OrderService.getAllOrder();
    return res.status(200).json(data);
  } catch (e) {
    // console.log(e)
    return res.status(404).json({
      message: e,
    });
  }
};

const getTotalAmount = async (req, res) => {
  try {
    const data = await OrderService.getTotalAmountByMonth();
    return res.status(200).json(data);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};
const paymentOnline = async (amount, orderInfo, ipAddr) => {
  var ipAddr = ipAddr;

  const dateFormat = await import("dateformat").then(
    (module) => module.default
  );

  var tmnCode = config.get("vnp_TmnCode");
  var secretKey = config.get("vnp_HashSecret");
  var vnpUrl = config.get("vnp_Url");
  var returnUrl = config.get("vnp_ReturnUrl");

  var date = new Date();
  var createDate = dateFormat(date, "yyyymmddHHmmss");
  var orderId = dateFormat(date, "HHmmss");
  var amount = parseFloat(amount);

  var orderInfo = orderInfo;
  var orderType = Math.random() * 100000;
  var locale = "vn";

  var expireDate = new Date(date.getTime() + 60 * 60 * 1000); // Thời gian hết hạn: 15 phút
  var expireDateFormatted = dateFormat(expireDate, "yyyymmddHHmmss");

  var currCode = "VND";
  var vnp_Params = {
    vnp_Version: "2",
    vnp_Command: "pay",
    vnp_TmnCode: tmnCode,
    vnp_Locale: locale,
    vnp_CurrCode: currCode,
    vnp_TxnRef: orderId,
    vnp_OrderInfo: orderInfo,
    vnp_OrderType: orderType,
    vnp_Amount: Math.round(amount * 100), // Convert amount to integer
    vnp_ReturnUrl: returnUrl,
    vnp_IpAddr: ipAddr,
    vnp_CreateDate: createDate,
    vnp_ExpireDate: expireDateFormatted,
  };

  var sortedParams = sortObject(vnp_Params);
  var signData = querystring.stringify(sortedParams, { encode: false });

  // Generate signature
  var hmac = crypto.createHmac("sha512", secretKey);
  var signed = hmac.update(signData, "utf8").digest("hex");
  vnp_Params["vnp_SecureHash"] = signed;

  // Construct URL
  vnpUrl += "?" + querystring.stringify(vnp_Params, { encode: false });
  return vnpUrl;
};
function sortObject(obj) {
  var sorted = {};
  Object.keys(obj)
    .sort()
    .forEach(function (key) {
      sorted[key] = obj[key];
    });
  return sorted;
}
const getBestSellingByDay = async (req, res) => {
  try {
    const data = await OrderService.getBestSellingProductsByDay();
    return res.status(200).json(data);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};
module.exports = {
  createOrder,
  getAllOrderDetails,
  getDetailsOrder,
  cancelOrderDetails,
  getAllOrder,
  getTotalAmount,
  deleteManyOrder,
  getBestSellingByDay,
};
