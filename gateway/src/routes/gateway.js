import express from "express";
import {
  getMyDebts,
  createPurchase,
} from "../controllers/purchase.controller.js";

const gatewayRouter = express.Router();

gatewayRouter.get("/my-debts", getMyDebts);
// gatewayRouter.get("/products", getProducts);
// gatewayRouter.post("/products", createProducts);
gatewayRouter.post("/purchases", createPurchase);

export default gatewayRouter;
