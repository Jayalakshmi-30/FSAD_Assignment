import React, { useState } from 'react';
import { FaCreditCard, FaCalendarAlt, FaLock, FaUser } from 'react-icons/fa';

const PaymentGateway = ({ removeAllItemsfromCart, onPaymentSuccess }) => {
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [name, setName] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true);
    
    setTimeout(async () => {
      await handleCartRemoval();
      onPaymentSuccess();
    }, 6000);
  };

  const handleCartRemoval = async () => {
    try {
      await removeAllItemsfromCart();
    } catch (error) {
      console.error('Error while clearing cart:', error);
    }
  };

  return (
    <div className="w-full max-w-[800px] mx-auto bg-gradient-to-br from-white to-pink-50 rounded-2xl shadow-2xl p-8 mt-12">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-1">Payment Details</h2>
        <p className="text-sm text-gray-600">Complete your purchase securely</p>
      </div>

      <form onSubmit={handleSubmit} className="w-full max-w-[600px] mx-auto space-y-6">
        <div className="relative">
          <FaCreditCard className="absolute top-3 left-3 text-gray-400 text-lg" />
          <input
            type="text"
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
            placeholder="Card Number"
            className="w-full pl-10 pr-4 py-2.5 text-base border-2 border-gray-200 rounded-lg focus:outline-none focus:border-pink-500 transition-colors duration-300"
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="relative">
            <FaCalendarAlt className="absolute top-3 left-3 text-gray-400 text-lg" />
            <input
              type="text"
              value={expiryDate}
              onChange={(e) => setExpiryDate(e.target.value)}
              placeholder="MM/YYYY"
              className="w-full pl-10 pr-4 py-2.5 text-base border-2 border-gray-200 rounded-lg focus:outline-none focus:border-pink-500 transition-colors duration-300"
              required
            />
          </div>

          <div className="relative">
            <FaLock className="absolute top-3 left-3 text-gray-400 text-lg" />
            <input
              type="password"
              value={cvv}
              onChange={(e) => setCvv(e.target.value)}
              placeholder="CVV"
              maxLength="3"
              className="w-full pl-10 pr-4 py-2.5 text-base border-2 border-gray-200 rounded-lg focus:outline-none focus:border-pink-500 transition-colors duration-300"
              required
            />
          </div>
        </div>

        <div className="relative">
          <FaUser className="absolute top-3 left-3 text-gray-400 text-lg" />
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name on Card"
            className="w-full pl-10 pr-4 py-2.5 text-base border-2 border-gray-200 rounded-lg focus:outline-none focus:border-pink-500 transition-colors duration-300"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-pink-500 text-white text-base font-semibold py-2.5 rounded-lg hover:bg-pink-600 hover:text-white transform hover:scale-[1.02] transition-all duration-300"
        >
          Pay Now
        </button>
      </form>

      {submitted && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-8 rounded-xl shadow-xl text-center max-w-md mx-auto">
            <div className="mb-4">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                <span className="text-green-500 text-4xl">✓</span>
              </div>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Payment Successful!</h3>
            <p className="text-gray-600 mb-4">Thank you for your purchase</p>
            <div className="w-full h-1 bg-green-500 rounded-full animate-pulse"></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentGateway;
