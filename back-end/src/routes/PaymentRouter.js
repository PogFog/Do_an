const express = require("express");
const router = express.Router();
const dotenv = require("dotenv");
const config = require("config");
const querystring = require("qs");
const crypto = require("crypto");
const { log, Console } = require("console");
dotenv.config();

router.post("/create_payment_url", async function (req, res, next) {
  var ipAddr =
    req.headers["x-forwarded-for"] ||
    req.connection.remoteAddress ||
    req.socket.remoteAddress ||
    req.connection.socket.remoteAddress;

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
  var amount = parseFloat(req.body.amount);

  var orderInfo = req.body.orderDescription;
  var orderType = req.body.orderType;
  var locale = req.body.language;

  var expireDate = new Date(date.getTime() + 60 * 60 * 1000); // Thời gian hết hạn: 15 phút
  var expireDateFormatted = dateFormat(expireDate, "yyyymmddHHmmss");
  if (!locale || locale === "") {
    locale = "vn";
  }
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

  res.status(200).json({ code: "00", data: vnpUrl });
});

router.get("/vnpay_ipn", function (req, res, next) {
  var vnp_Params = req.query;

  var secureHash = vnp_Params["vnp_SecureHash"];
  delete vnp_Params["vnp_SecureHash"];
  delete vnp_Params["vnp_SecureHashType"];
  console.log("req.query", secureHash);

  var sortedParams = sortObject(vnp_Params);

  var secretKey = config.get("vnp_HashSecret");
  var signData = querystring.stringify(sortedParams, { encode: false });
  var hmac = crypto.createHmac("sha512", secretKey);
  var signed = hmac.update(signData, "utf8").digest("hex");
  signedcheck = signed.toUpperCase(); // Convert to uppercase

  if (secureHash === signedcheck) {
    var orderId = vnp_Params["vnp_TxnRef"];
    var rspCode = vnp_Params["vnp_ResponseCode"];
    //Kiem tra du lieu co hop le khong, cap nhat trang thai don hang va gui ket qua cho VNPAY theo dinh dang duoi
    res.status(200).json({ RspCode: "00", Message: "success" });
  } else {
    res.status(200).json({ RspCode: "97", Message: "Fail checksum" });
  }
});

router.get("/vnpay_return", function (req, res, next) {
  var vnp_Params = req.query;

  var secureHash = vnp_Params["vnp_SecureHash"];

  delete vnp_Params["vnp_SecureHash"];
  delete vnp_Params["vnp_SecureHashType"];

  vnp_Params = sortObject(vnp_Params);

  var config = require("config");
  var tmnCode = config.get("vnp_TmnCode");
  var secretKey = config.get("vnp_HashSecret");

  var querystring = require("qs");
  var signData = querystring.stringify(vnp_Params, { encode: false });
  var crypto = require("crypto");
  var hmac = crypto.createHmac("sha512", secretKey);
  var signed = hmac.update(signData, "utf-8").digest("hex");

  if (secureHash === signed) {
    //Kiem tra xem du lieu trong db co hop le hay khong va thong bao ket qua

    res.render("success", { code: vnp_Params["vnp_ResponseCode"] });
  } else {
    res.render("success", { code: "97" });
  }
});

function sortObject(obj) {
  var sorted = {};
  Object.keys(obj)
    .sort()
    .forEach(function (key) {
      sorted[key] = obj[key];
    });
  return sorted;
}

module.exports = router;
