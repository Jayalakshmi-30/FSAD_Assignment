import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    fullname: {
        type: String,
        required: true,
    }, 
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ["reader", "book_owner_share", "book_owner_reader"],
        required: true,
    },
    secretQuestion: {
        type: String,
        required: true
    },
    secretAnswer: {
        type: String,
        required: true
    }
});
const User = mongoose.model("User", userSchema);
export default User;