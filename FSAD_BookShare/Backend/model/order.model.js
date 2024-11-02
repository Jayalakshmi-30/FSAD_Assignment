import mongoose from "mongoose";

const orderSchema = mongoose.Schema({
    userid: String,
    name: String,
    address: String,
    pincode: Number,
    mobile: Number,
    email: String,
    cart: Array,
    totalamount: Number,
    status: String,
    createdat: {
        type: Date,
        default: Date.now,
    },
    lastupdatedat: {
        type: Date,
        default: Date.now,
    },
});
const Order = mongoose.model("Order", orderSchema);

export default Order;