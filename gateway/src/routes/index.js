import express from "express";
import gatewayRouter from "./gateway.js";

const router = express.Router();

router.use("/gateway", gatewayRouter);

export default router;
