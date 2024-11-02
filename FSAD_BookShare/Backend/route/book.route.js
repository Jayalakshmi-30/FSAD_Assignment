import express from "express";
import { getBook, addBook, updateBook, deleteBook, getBookById } from "../controller/book.controller.js";

const router = express.Router();

router.get("/", getBook);
router.post("/add", addBook);
router.put("/update/:id", updateBook);
router.delete("/delete/:id", deleteBook);
router.get("/:id", getBookById);

export default router;
