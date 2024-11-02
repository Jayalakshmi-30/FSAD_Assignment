import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import toast from "react-hot-toast";

function Cards({ item }) {
  const [cartCount, setCartCount] = useState(0);  
  const handleAddToCart = (book) => {
    //onAddToCart(book);
    addBookToCart(book); // Call addBookToCart function
    setCartCount(prevCount => prevCount + 1);
  };
  const [authUser, setAuthUser] = useAuth();
  const addBookToCart = async (data) => {
    const cartInfo = {
      userid: authUser._id,
      booktitle: data.name,
      bookimage: data.image,
      price: data.price,
      status: "Added To Cart",
      contact: data.contact,
    };
    await axios
      .post("http://localhost:4001/cart/addbook", cartInfo)
      .then((res) => {
        console.log(res.data);
        if (res.data) {
          toast.success("Book Added to Cart successfully");
        }
      })
      .catch((err) => {
        if (err.response) {
          console.log(err);
          toast.error("Error: " + err.response.data.message);
        }
      });
  };

  return (
    <>
      <div className="mt-4 my-3 p-3">
        <div className="card w-92 bg-base-100 shadow-xl hover:scale-105 duration-200 dark:bg-slate-900 dark:text-white dark:border">
          <figure>
            <img src={item.image} alt="Shoes" />
          </figure>
          <div className="card-body">
            <h2 className="card-title">
              {item.name}
              <div className="badge badge-secondary">{item.category}</div>
            </h2>
            <p>{item.title}</p>
            <div className="card-actions justify-between">
              <div className="badge badge-outline">₹ {item.price}</div>
              <div className=" cursor-pointer px-2 py-1 rounded-full border-[2px] hover:bg-pink-500 hover:text-white duration-200" 
              onClick={() => handleAddToCart(item)}>
                Add to Cart
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Cards;
