import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Books from "./Books";
import Footer from "./Footer";
import CartPage from "./CartPage";

function BookList({ setBooksInCart }) {
  const [cartCount, setCartCount] = useState(0);  

  useEffect(() => {
    console.log('useEffect called');
    const cartCount = localStorage.getItem("cartCount");
    console.log(cartCount);
    if (cartCount) {
      setCartCount(parseInt(cartCount));
    }
  }, []);

  const handleAddToCart = (book) => {
    setCartCount(prevCount => prevCount + 1);
    setBooksInCart(prevBooks => [...prevBooks, book]); // Update booksInCart state immutably
  };

  return (
    <div className="bg-gradient-to-r from-pink-50 to-purple-50">
      <Navbar cartCount={cartCount} />
      <div className="min-h-screen">
        <Books onAddToCart={handleAddToCart} />        
      </div>
      <Footer />
    </div>
  );
}

export default BookList;
