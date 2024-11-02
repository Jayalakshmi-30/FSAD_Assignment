// App.jsx

import React, { useState } from 'react';
import Home from "./home/Home";
import { Route, Routes } from "react-router-dom";
import BookList from "./components/BookLists";
import Signup from "./components/Signup";
import Login from "./components/Login";
import ForgotPassword from './components/ForgotPassword';
import { Toaster } from "react-hot-toast";
import { useAuth } from "./context/AuthProvider";
import Navbar from "./components/Navbar";
import CartPage from "./components/CartPage"; // Import CartPage component
import Cart from "./components/Cart"; // Import Cart component
import PaymentGateway from "./components/PaymentGateway";
import ContactDetails from "./components/ContactDetails";
import About from "./components/About";
import ReviewPage from './components/ReviewPage';
import AddBookPage from './components/AddBookPage';
import EditBook from './components/EditBook';

function App() {
  const [authUser, setAuthUser] = useAuth();
  const [cartItemsCount, setCartItemsCount] = useState(0);
  const [booksInCart, setBooksInCart] = useState([]);   
  console.log(authUser);
  
  return (
    <>      
      <div className="dark:bg-slate-900 dark:text-white">      
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/BookList"
            element={<BookList setBooksInCart={setBooksInCart} setCartItemsCount={setCartItemsCount} />}           
          />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          {/* Define route for CartPage */}
          <Route path="/cart" element={<Cart/>} /> 
          <Route path="/ContactDetails" element={<ContactDetails/>} />
          <Route path="/About" element={<About/>} />
          <Route path="/review" element={<ReviewPage />} />
          <Route path="/addbook" element={<AddBookPage />} />
          <Route path="/editbook/:id" element={<EditBook />} />                
        </Routes>       
        <Toaster />
      </div>
    </>
  );
}

export default App;
