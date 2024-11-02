import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import toast from "react-hot-toast";

function Books({ onAddToCart }) {
  const navigate = useNavigate();
  const [books, setBooks] = useState([]);
  const [authUser] = useAuth();
  const [filterCategory, setFilterCategory] = useState('');

  useEffect(() => {
    getBooks();
  }, []);

  const getBooks = async () => {
    try {
      const res = await axios.get("http://localhost:4001/book");
      setBooks(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddToCart = (book) => {
    onAddToCart(book);
    addBookToCart(book);
  };

  const handleEditBook = (bookId) => {
    navigate(`/editbook/${bookId}`);
  };

  const handleDeleteBook = async (bookId) => {
    if (window.confirm('Are you sure you want to delete this book?')) {
        try {
            await axios.delete(`http://localhost:4001/book/delete/${bookId}`);
            toast.success("Book deleted successfully");
            getBooks(); // Refresh the book list
        } catch (error) {
            toast.error("Error deleting book");
            console.log(error);
        }
    }
};


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
        if (res.data) {
          toast.success("Book Added to Cart successfully");
        }
      })
      .catch((err) => {
        if (err.response) {
          toast.error("Error: " + err.response.data.message);
        }
      });
  };

  const filteredBooks = books.filter(book => filterCategory === '' ? true : book.category === filterCategory);

  return (
    <>
      <div className="max-w-screen-2xl container mx-auto md:px-20 px-4">
        <div className="mt-28 items-center justify-center text-center">
          <h1 className="text-2xl md:text-4xl">
            Share the Joy of reading{" "}
            <span className="text-pink-500"> Here!</span>
          </h1>
          <Link to="/review">
            <button className="mt-6 bg-pink-500 text-white px-4 py-2 rounded-md hover:bg-pink-700 duration-300">
              Share
            </button>
          </Link>
        </div>
        <div className="mt-12 flex justify-between items-center">
          <h2 className="text-lg font-medium">Filter by Category:</h2>
          <select 
            className="bg-white border border-gray-400 p-2 rounded-md" 
            value={filterCategory} 
            onChange={(e) => setFilterCategory(e.target.value)}
          >
            <option value="">All</option>
            {Array.from(new Set(books.map(book => book.category))).map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>
        <div className="mt-12 grid grid-cols-1 md:grid-cols-4 gap-6">
          {filteredBooks.map((book) => (
            <div className="book-body space-y-4" key={book.id}>
              <div className="relative group">
                <img
                  src={book.image}
                  alt={book.name}
                  className="mb-3 w-full transition-opacity duration-300"
                />
                <div className="absolute inset-0 bg-black bg-opacity-75 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-4">
                  <p className="text-white text-xl font-semibold text-center">
                    {book.title}
                  </p>
                </div>
              </div>
              <div className="badge badge-secondary mt-2">{book.category}</div>
              <p className="text-lg font-medium mt-3">{book.name}</p>
              <p className="text-md text-gray-600">By {book.bookOwner}</p>
              <div className="card-actions justify-between mt-4">
                <div className="badge badge-outline text-base">₹ {book.price}</div>
                <div className="flex gap-2">
                  <button
                    className="cursor-pointer px-4 py-2 rounded-full border-[2px] hover:bg-blue-500 hover:text-white duration-200"
                    onClick={() => handleEditBook(book.id)}
                  >
                    Edit
                  </button>
                  <button
                    className="cursor-pointer px-4 py-2 rounded-full border-[2px] hover:bg-red-500 hover:text-white duration-200"
                    onClick={() => handleDeleteBook(book.id)}
                  >
                    Delete
                  </button>
                  <div
                    className="cursor-pointer px-4 py-2 rounded-full border-[2px] hover:bg-pink-500 hover:text-white duration-200"
                    onClick={() => handleAddToCart(book)}
                  >
                    Add to Cart
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Books;
