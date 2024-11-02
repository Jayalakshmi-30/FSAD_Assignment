import React, {useEffect, useState} from "react";
import Navbar from "../components/Navbar";
import Banner from "../components/Banner";
import Freebook from "../components/Freebook";
import Footer from "../components/Footer";

function Home() {
  const [cartCount, setCartCount] = useState(0);
  useEffect(() => {
    console.log('useEffect called');
    const cartCount1 = localStorage.getItem("cartCount");
    console.log(cartCount1);
    if (cartCount1) {
      setCartCount(parseInt(cartCount1));
    }
  });
  const handleAddToCart = (item) => {
    setCartCount(prevCount => prevCount + 1);
    
  };
  return (
    <>
      <Navbar cartCount={cartCount}/>
      <Banner />
      <Freebook onAddToCart={handleAddToCart}/>
      <Footer />
    </>
  );
}

export default Home;
