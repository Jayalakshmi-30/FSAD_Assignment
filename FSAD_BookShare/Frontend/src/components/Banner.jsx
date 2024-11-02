import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import banner from "../../public/Book2.png";
import BookSearch from "./BookSearch";

function Banner() {
  const [book, setBook] = useState([]);

  return (
    <div>
      <div
        className="relative w-full min-h-[500px] bg-cover bg-center"
        style={{ backgroundImage: `url(${banner})` }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>

        <div className="relative max-w-screen-2xl container mx-auto flex flex-col items-center h-full md:px-20 px-4 pt-16">
          <div className="text-center space-y-8 p-6 fixed-header">
            <h1 className="text-4xl font-bold">
              <span className="text-white">Welcome to </span>
              <span className="text-pink-200">Book Buddy!</span>
              <span className="text-white"> Uncover the wonder of reading </span>
              <span className="text-pink-200">Dive into a World of Stories!</span>
              <span className="text-white">...</span>
            </h1>
            <h1 className="text-4xl font-bold text-white">Explore the World of Books!!</h1>

            <div className="mb-6">
              <BookSearch setBook={setBook} />
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 pb-8">
        {book.length > 0 && (
          <div className="search-results mt-4">
            {/* Search results will be displayed here */}
          </div>
        )}
      </div>
    </div>
  );
}

export default Banner;
