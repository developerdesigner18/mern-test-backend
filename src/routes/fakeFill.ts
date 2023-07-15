import express, { Router } from "express";

const fakeFill: Router = express.Router();

fakeFill.post("/fillFakeUser", (req, res) => {
  console.log("hello");
  res.status(200).json({ message: "API called" });
});

export default fakeFill;
