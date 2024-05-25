const Order = require("../models/OrderProduct");
const Product = require("../models/ProductModel");
// const EmailService = require("../services/EmailService");

const createOrder = (newOrder) => {
  return new Promise(async (resolve, reject) => {
    const {
      orderItems,
      paymentMethod,
      itemsPrice,
      shippingPrice,
      totalPrice,
      fullName,
      address,
      city,
      phone,
      user,
      isPaid,
      paidAt,
      email,
    } = newOrder;
    try {
      const promises = orderItems.map(async (order) => {
        const productData = await Product.findOneAndUpdate(
          {
            _id: order.product,
            countInStock: { $gte: order.amount },
          },
          {
            $inc: {
              countInStock: -order.amount,
              selled: +order.amount,
            },
          },
          { new: true }
        );
        if (productData) {
          return {
            status: "OK",
            message: "SUCCESS",
            productData: productData,
          };
        } else {
          return {
            status: "OK",
            message: "ERR",
            id: order.product,
          };
        }
      });
      const results = await Promise.all(promises);
      let pay = false;
      if (paymentMethod == "paypal") {
        pay = true;
      }
      const newData = results && results.filter((item) => item.id);
      if (newData.length) {
        const arrId = [];
        newData.forEach((item) => {
          arrId.push(item.id);
        });
        resolve({
          status: "ERR",
          message: `San pham voi id: ${arrId.join(",")} khong du hang`,
        });
      } else {
        const createdOrder = await Order.create({
          orderItems,
          shippingAddress: {
            fullName,
            address,
            city,
            phone,
          },
          paymentMethod,
          itemsPrice,
          shippingPrice,
          totalPrice,
          user: user,
          isPaid: pay,
          paidAt,
        });

        if (createdOrder) {
          // await EmailService.sendEmailCreateOrder(email, orderItems);
          resolve({
            status: "OK",
            message: "success",
          });
        }
      }
    } catch (e) {
      //   console.log('e', e)
      reject(e);
    }
  });
};

const deleteManyOrder = (ids) => {
  return new Promise(async (resolve, reject) => {
    try {
      await Order.deleteMany({ _id: ids });
      resolve({
        status: "OK",
        message: "Delete product success",
      });
    } catch (e) {
      reject(e);
    }
  });
};

const getAllOrderDetails = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const order = await Order.find({
        user: id,
      }).sort({ createdAt: -1, updatedAt: -1 });
      if (order === null) {
        resolve({
          status: "ERR",
          message: "The order is not defined",
        });
      }

      resolve({
        status: "OK",
        message: "SUCESSS",
        data: order,
      });
    } catch (e) {
      // console.log('e', e)
      reject(e);
    }
  });
};

const getOrderDetails = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const order = await Order.findById({
        _id: id,
      });
      if (order === null) {
        resolve({
          status: "ERR",
          message: "The order is not defined",
        });
      }

      resolve({
        status: "OK",
        message: "SUCESSS",
        data: order,
      });
    } catch (e) {
      // console.log('e', e)
      reject(e);
    }
  });
};

const cancelOrderDetails = (id, data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let order = [];
      const promises = data.map(async (order) => {
        const productData = await Product.findOneAndUpdate(
          {
            _id: order.product,
            selled: { $gte: order.amount },
          },
          {
            $inc: {
              countInStock: +order.amount,
              selled: -order.amount,
            },
          },
          { new: true }
        );
        if (productData) {
          order = await Order.findByIdAndDelete(id);
          if (order === null) {
            resolve({
              status: "ERR",
              message: "The order is not defined",
            });
          }
        } else {
          return {
            status: "OK",
            message: "ERR",
            id: order.product,
          };
        }
      });
      const results = await Promise.all(promises);
      const newData = results && results[0] && results[0].id;

      if (newData) {
        resolve({
          status: "ERR",
          message: `San pham voi id: ${newData} khong ton tai`,
        });
      }
      resolve({
        status: "OK",
        message: "success",
        data: order,
      });
    } catch (e) {
      reject(e);
    }
  });
};

const getAllOrder = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const allOrder = await Order.find().sort({
        createdAt: -1,
        updatedAt: -1,
      });
      resolve({
        status: "OK",
        message: "Success",
        data: allOrder,
      });
    } catch (e) {
      reject(e);
    }
  });
};
const getTotalAmountByMonth = () => {
  return Order.aggregate([
    {
      $unwind: "$orderItems", // Mở rộng mảng orderItems thành các bản ghi riêng lẻ
    },
    {
      $group: {
        _id: {
          year: { $year: "$createdAt" },
          month: { $month: "$createdAt" },
        },
        totalAmount: { $sum: "$totalPrice" }, // Tính tổng số lượng sản phẩm bán được trong mỗi đơn hàng
        totalProducts: { $sum: "$orderItems.amount" }, // Tính tổng số lượng đơn hàng
      },
    },
    {
      $sort: { "_id.year": 1, "_id.month": 1 },
    },
    {
      $project: {
        _id: 0, // Loại bỏ _id từ kết quả
        year: "$_id.year",
        month: {
          $arrayElemAt: [
            ["", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"],
            "$_id.month",
          ],
        },
        totalAmount: 1, // Bao gồm totalAmount trong kết quả
        totalProducts: 1, // Bao gồm totalProducts trong kết quả
      },
    },
  ]);
};
const getBestSellingProductsByDay = () => {
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Thiết lập thời gian bắt đầu của ngày

  const endOfDay = new Date();
  endOfDay.setHours(23, 59, 59, 999); // Thiết lập thời gian kết thúc của ngày

  return Order.aggregate([
    {
      $unwind: "$orderItems", // Mở rộng mảng orderItems thành các bản ghi riêng lẻ
    },
    {
      $match: {
        createdAt: {
          $gte: today, // Chỉ lấy các đơn hàng từ đầu ngày
          $lt: endOfDay, // đến cuối ngày
        },
      },
    },
    {
      $group: {
        _id: "$orderItems.product", // Nhóm theo sản phẩm
        name: { $first: "$orderItems.name" }, // Lấy tên sản phẩm
        totalSold: { $sum: "$orderItems.amount" }, // Tính tổng số lượng đã bán
        totalRevenue: {
          $sum: { $multiply: ["$orderItems.amount", "$orderItems.price"] },
        }, // Tính tổng doanh thu
      },
    },
    {
      $sort: { totalSold: -1 }, // Sắp xếp theo tổng số lượng đã bán giảm dần
    },
    {
      $limit: 10, // Giới hạn kết quả trả về là 10 sản phẩm bán chạy nhất
    },
    {
      $project: {
        _id: 0, // Loại bỏ _id khỏi kết quả
        product: "$_id", // Bao gồm ID sản phẩm
        name: 1, // Bao gồm tên sản phẩm
        totalSold: 1, // Bao gồm tổng số lượng đã bán
        totalRevenue: 1, // Bao gồm tổng doanh thu
      },
    },
  ]);
};

module.exports = {
  getTotalAmountByMonth,
  createOrder,
  getAllOrderDetails,
  getOrderDetails,
  cancelOrderDetails,
  getAllOrder,
  deleteManyOrder,
  getBestSellingProductsByDay,
};
