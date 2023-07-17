import express, { Router } from "express";
const {
  addFakeProducts,
  addFakeUsers,
  addFakeOrders,
} = require("../controller/FakeFillerController");
const fakeFill: Router = express.Router();

fakeFill.post("/fillFakeProduct", addFakeProducts);
fakeFill.post("/fillFakeUser", addFakeUsers);
fakeFill.post("/fillFakeOrder", addFakeOrders);

export default fakeFill;
