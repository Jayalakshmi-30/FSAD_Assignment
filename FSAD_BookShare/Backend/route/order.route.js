import express from "express";
import { createorder } from "../controller/order.controller.js";
const router = express.Router();

router.post("/createorder", createorder);

export default router;