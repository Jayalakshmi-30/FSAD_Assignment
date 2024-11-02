import mongoose from "mongoose";

const bookSchema = mongoose.Schema({
    id: Number,
    name: String,
    title: String,
    price: Number,
    category: String,
    image: String,
    bookOwner: String,
    contact: String,
    status: String
});

const Book = mongoose.model("Book", bookSchema);
export default Book;
