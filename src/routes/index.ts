import express, { Router } from "express";
import fakeFill from "./fakeFill";

const apiRoutes: Router = express.Router();

apiRoutes.use("/fakeFill", fakeFill);

export default apiRoutes;
