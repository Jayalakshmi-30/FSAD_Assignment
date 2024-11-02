import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useAuth } from "../context/AuthProvider";

const BookSearch = ({ setBook }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [isBookAvailable, setIsBookAvailable] = useState(false);
    const [searchResults, setSearchResults] = useState([]);
    const [hasSearched, setHasSearched] = useState(false);
    const [authUser, setAuthUser] = useAuth();

    const handleSearch = async () => {
        setHasSearched(true);
        
        if (!searchQuery.trim()) {
            setSearchResults([]);
            setBook([]);
            setIsBookAvailable(false);
            return;
        }

        try {
            const res = await axios.get("http://localhost:4001/book/");
            const allBooks = res.data;
            const filteredBooks = allBooks.filter(book =>
                book.name.toLowerCase().includes(searchQuery.toLowerCase().trim())
            );
            
            setSearchResults(filteredBooks);
            setBook(filteredBooks);
            setIsBookAvailable(filteredBooks.length > 0);
        } catch (error) {
            console.log(error);
        }
    };

    const handleAddToCart = async (book) => {
        const cartData = {
            userid: authUser._id,
            booktitle: book.name,
            bookimage: book.image,
            price: book.price,
            status: "Added To Cart",
            contact: book.contact
        };
        
        const response = await axios.post('http://localhost:4001/cart/addbook', cartData);
        if (response.status === 201) {
            alert('Book added to cart successfully!');
        }
    };

    return (
        <div>
            <div className="flex flex-col items-center gap-4">
                <div className="flex gap-2 w-full">
                    <label className="input input-bordered flex items-center gap-2 flex-grow">
                        <input
                            type="text"
                            className="grow"
                            placeholder="Search"
                            value={searchQuery}
                            onChange={(e) => {
                                setSearchQuery(e.target.value);
                                setHasSearched(false);
                            }}
                            onKeyPress={(e) => {
                                if (e.key === 'Enter') handleSearch();
                            }}
                        />
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 16 16"
                            fill="currentColor"
                            className="w-4 h-4 opacity-70 hover:opacity-100 cursor-pointer"
                            onClick={handleSearch}
                        >
                            <path
                                fillRule="evenodd"
                                d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </label>
                </div>

                <Link to="/BookList" className="btn btn-secondary">
                    Explore
                </Link>
            </div>

            {hasSearched && searchQuery && !isBookAvailable && (
                <p className="text-center mt-4">Book is not available.</p>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                {searchResults.map((book) => (
                    <div key={book._id} className="card bg-base-100 shadow-xl scale-90">
                        <figure>
                            <img
                                src={book.image}
                                alt={book.name}
                                className="h-62 w-full object-cover"
                            />
                        </figure>
                        <div className="card-body p-3">
                            <h2 className="card-title text-sm text-center w-full justify-center">{book.name}</h2>
                            <p className="text-xs">Price: ₹{book.price}</p>
                            <p className="text-xs">Status: {book.status}</p>
                            <div className="card-actions justify-end">
                                <button
                                    className="btn btn-secondary btn-sm mt-2"
                                    onClick={() => handleAddToCart(book)}
                                >
                                    Add to Cart
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BookSearch;
