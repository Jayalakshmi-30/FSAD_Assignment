import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../context/AuthProvider";
import axios from "axios";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { FaUser, FaHome, FaMapMarkerAlt, FaMobile, FaEnvelope, FaShoppingCart, FaTrash } from 'react-icons/fa';
import Navbar from './Navbar';
import Footer from './Footer';
import Messenger from './Messanger';
import PaymentGateway from './PaymentGateway';

const Cart = () => {
  const navigate = useNavigate();
  const [authUser] = useAuth();
  const { register, handleSubmit, formState: { errors } } = useForm();
  
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    pincode: '',
    mobile: '',
    email: ''
  });

  const [showPaymentGateway, setShowPaymentGateway] = useState(false);
  const [checkoutClicked, setCheckoutClicked] = useState(false);
  const [cart, setCart] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [cartTotal, setCartTotal] = useState(0);
  const [paymentSuccessful, setPaymentSuccessful] = useState(false);

  useEffect(() => {
    fetchUserCart();
    const handleFocus = () => fetchUserCart();
    window.addEventListener('focus', handleFocus);
    return () => window.removeEventListener('focus', handleFocus);
  }, []);

  const fetchUserCart = async () => {
    if (!authUser._id) return;
    try {
      const res = await axios.post("http://localhost:4001/cart/usercart", { userid: authUser._id });
      if (res.data) {
        setCart(res.data.carts);
        setCartCount(res.data.carts.length);
        localStorage.setItem("cartCount", res.data.carts.length);
        const total = res.data.carts.reduce((sum, item) => sum + item.price, 0);
        setCartTotal(total);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const removeCartItem = (item) => async () => {
    try {
      const res = await axios.post("http://localhost:4001/cart/removeItem", {
        userid: authUser._id,
        booktitle: item.booktitle,
      });
      if (res.data) {
        setCart(res.data.carts);
        setCartCount(res.data.carts.length);
        localStorage.setItem("cartCount", res.data.carts.length);
        const total = res.data.carts.reduce((sum, item) => sum + item.price, 0);
        setCartTotal(total);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const onSubmit = async (data) => {
    const orderInfo = {
      userid: authUser._id,
      name: data.name,
      address: data.address,
      pincode: data.pincode,
      mobile: data.mobile,
      email: data.email,
      totalamount: cartTotal,
      cart: cart,
    };

    try {
      const res = await axios.post("http://localhost:4001/order/createorder", orderInfo);
      if (res.data) {
        toast.success("Make Payment to place your order");
        setShowPaymentGateway(true);
      }
    } catch (err) {
      toast.error("Error: " + err.response?.data.message);
    }
  };

  const removeAllItemsfromCart = async () => {
    try {
      const res = await axios.post("http://localhost:4001/cart/removeCart", { userid: authUser._id });
      if (res.data) {
        setFormData({ name: '', address: '', pincode: '', mobile: '', email: '' });
        setCart([]);
        setCartCount(0);
        localStorage.setItem("cartCount", 0);
        setCartTotal(0);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar cartCount={cartCount} />
      
      <div className="max-w-screen-2xl container mx-auto md:px-20 px-4">
        <div className="mt-28 items-center justify-center text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Cart & Checkout</h2>
          <p className="text-sm text-gray-600 mb-8">Complete your book purchase</p>

          <Messenger phoneNumber="+1234567890" />

          {cart.length > 0 ? (
            <div className="w-full max-w-[800px] mx-auto bg-gradient-to-br from-white to-pink-50 rounded-2xl shadow-2xl p-8">
              <div className="space-y-4 mb-8">
                {cart.map((item, index) => (
                  <div key={index} className="flex items-center p-4 bg-white rounded-lg shadow">
                    <img src={item.bookimage} alt={item.booktitle} className="w-20 h-28 object-cover rounded-md" />
                    <div className="ml-4 flex-1">
                      <h3 className="text-lg font-semibold text-gray-800">{item.booktitle}</h3>
                      <p className="text-pink-500 font-medium">₹{item.price}</p>
                      <p className="text-gray-600 text-sm">Contact: {item.contact}</p>
                    </div>
                    <button 
                      onClick={removeCartItem(item)}
                      className="text-red-500 hover:text-red-600 p-2 transition-colors"
                    >
                      <FaTrash />
                    </button>
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-200 pt-4 mb-6">
                <div className="flex justify-between items-center text-lg font-semibold">
                  <span>Total Amount:</span>
                  <span className="text-pink-500">₹{cartTotal}</span>
                </div>
              </div>

              <div className="space-y-4">
                <button
                  onClick={() => setCheckoutClicked(true)}
                  className="w-full bg-pink-500 text-white text-base font-semibold py-2.5 rounded-lg hover:bg-pink-600 hover:text-white transform hover:scale-[1.02] transition-all duration-300"
                >
                  Proceed to Checkout
                </button>
                <button
                  onClick={() => navigate('/BookList')}
                  className="w-full bg-gray-100 text-gray-800 text-base font-semibold py-2.5 rounded-lg hover:bg-gray-200 transition-all duration-300"
                >
                  Continue Shopping
                </button>
              </div>

              {checkoutClicked && (
                <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-4">
                  <div className="relative">
                    <FaUser className="absolute top-3 left-3 text-gray-400 text-lg" />
                    <input
                      type="text"
                      placeholder="Full Name"
                      className="w-full pl-10 pr-4 py-2.5 text-base border-2 border-gray-200 rounded-lg focus:outline-none focus:border-pink-500 transition-colors duration-300"
                      {...register("name", { required: true })}
                    />
                    {errors.name && <span className="text-xs text-red-500 mt-0.5 block">Required field</span>}
                  </div>

                  <div className="relative">
                    <FaHome className="absolute top-3 left-3 text-gray-400 text-lg" />
                    <input
                      type="text"
                      placeholder="Address"
                      className="w-full pl-10 pr-4 py-2.5 text-base border-2 border-gray-200 rounded-lg focus:outline-none focus:border-pink-500 transition-colors duration-300"
                      {...register("address", { required: true })}
                    />
                    {errors.address && <span className="text-xs text-red-500 mt-0.5 block">Required field</span>}
                  </div>

                  <div className="relative">
                    <FaMapMarkerAlt className="absolute top-3 left-3 text-gray-400 text-lg" />
                    <input
                      type="text"
                      placeholder="Pincode"
                      className="w-full pl-10 pr-4 py-2.5 text-base border-2 border-gray-200 rounded-lg focus:outline-none focus:border-pink-500 transition-colors duration-300"
                      {...register("pincode", { required: true })}
                    />
                    {errors.pincode && <span className="text-xs text-red-500 mt-0.5 block">Required field</span>}
                  </div>

                  <div className="relative">
                    <FaMobile className="absolute top-3 left-3 text-gray-400 text-lg" />
                    <input
                      type="tel"
                      placeholder="Mobile Number"
                      className="w-full pl-10 pr-4 py-2.5 text-base border-2 border-gray-200 rounded-lg focus:outline-none focus:border-pink-500 transition-colors duration-300"
                      {...register("mobile", { required: true })}
                    />
                    {errors.mobile && <span className="text-xs text-red-500 mt-0.5 block">Required field</span>}
                  </div>

                  <div className="relative">
                    <FaEnvelope className="absolute top-3 left-3 text-gray-400 text-lg" />
                    <input
                      type="email"
                      placeholder="Email Address"
                      className="w-full pl-10 pr-4 py-2.5 text-base border-2 border-gray-200 rounded-lg focus:outline-none focus:border-pink-500 transition-colors duration-300"
                      {...register("email", { required: true })}
                    />
                    {errors.email && <span className="text-xs text-red-500 mt-0.5 block">Required field</span>}
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-pink-500 text-white text-base font-semibold py-2.5 rounded-lg hover:bg-pink-600 hover:text-white transform hover:scale-[1.02] transition-all duration-300"
                  >
                    Proceed to buy items
                  </button>
                </form>
              )}

              {showPaymentGateway && !paymentSuccessful && (
                <PaymentGateway 
                  removeAllItemsfromCart={removeAllItemsfromCart} 
                  onPaymentSuccess={() => setPaymentSuccessful(true)} 
                />
              )}
            </div>
          ) : (
            <div className="text-center py-12">
              <FaShoppingCart className="mx-auto text-6xl text-gray-300 mb-4" />
              <p className="text-gray-600">Your cart is empty. Contact owners for any information required.</p>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Cart;
