import React from 'react';

const CartPage = ({ booksInCart }) => {
  console.log("booksInCart:", booksInCart); // Add this line for debugging

  return (
    <div className="max-w-screen-2xl container mx-auto md:px-20 px-4">
      <div className="mt-28 items-center justify-center text-center">
        <div className="cart-page">
          <h2>Cart</h2>
          <div className="cart-items">
            {booksInCart.map((item, index) => (
              <div key={index} className="cart-item">
                <p>{item.name}</p>
                <p>Price: ${item.price}</p>
              </div>
            ))}
          </div>
          {/* Other cart details */}
        </div>
      </div>
    </div>
  );
};

export default CartPage;
