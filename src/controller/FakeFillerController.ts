const Product = require("../models/product.model");
const User = require("../models/user.model");
const Order = require("../models/order.model");

const {
  generateFakeProducts,
  generateFakeUsers,
  getAllProductAndUserIDs,
  generateFakeOrders,
} = require("../util/helper");

exports.addFakeProducts = async (req: any, res: any) => {
  try {
    const productData = await generateFakeProducts(10);
    const dataAdded = await Product.insertMany(productData);

    if (!dataAdded)
      res
        .status(300)
        .json({ message: "Something went wrong while adding data" });

    res.status(200).json({ message: "Fake product data filled" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server is down" });
  }
};

exports.addFakeUsers = async (req: any, res: any) => {
  try {
    const userData = await generateFakeUsers(10);
    const dataAdded = await User.insertMany(userData);

    if (!dataAdded)
      res
        .status(300)
        .json({ message: "Something went wrong while adding data" });

    res.status(200).json({ message: "Fake user data filled" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server is down" });
  }
};

exports.addFakeOrders = async (req: any, res: any) => {
  try {
    const { productIdList, userIdList } = await getAllProductAndUserIDs();
    const orderData = await generateFakeOrders(10, userIdList, productIdList);
    const dataAdded = await Order.insertMany(orderData);

    if (!dataAdded)
      res
        .status(300)
        .json({ message: "Something went wrong while adding data" });

    res.status(200).json({ message: "Fake order data filled" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server is down" });
  }
};
