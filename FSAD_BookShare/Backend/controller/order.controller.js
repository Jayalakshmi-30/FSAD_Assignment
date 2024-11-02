import Order from "../model/order.model.js";
export const createorder = async(req, res) => {
    try {
        const { userid, name, address, pincode, mobile, email, cart, totalamount, status } = req.body;
        const createdOrder= new Order({
            userid: userid,
            name: name,
            address: address,
            pincode: pincode,
            mobile: mobile,
            email: email,
            cart: cart,
            totalamount: totalamount,
            status: status,
        });
        //
        await createdOrder.save();
        res.status(201).json({
            message: "Order placed successfully",
            order: {
                _id: createdOrder._id,
                userid: createdOrder.userid,
                name: createdOrder.name,
                address: createdOrder.address,
                pincode: createdOrder.pincode,
                mobile: createdOrder.mobile,
                email: createdOrder.email,
                cart: createdOrder.cart,
                totalamount: createdOrder.totalamount,
                status: createdOrder.status,
            }
        });
    } catch (error) {
        console.log("Error: " + error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};