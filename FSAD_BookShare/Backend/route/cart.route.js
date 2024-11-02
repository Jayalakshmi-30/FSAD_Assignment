import express from "express";
import { addbook, usercart, removeItem, removeCart } from "../controller/cart.controller.js";
const router = express.Router();

router.post("/addbook", addbook);
router.post("/usercart", usercart);
router.post("/removeItem", removeItem);
router.post("/removeCart", removeCart);

export default router;