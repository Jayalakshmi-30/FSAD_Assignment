import React from 'react';
import { FaBookOpen, FaUsers, FaShareAlt } from 'react-icons/fa'; // Importing icons

const About = () => {
  return (
    <div className="bg-white py-12">
      <div className="container mx-auto p-8">
        <h2 className="text-4xl font-bold text-gray-800 text-center mb-8">About Book Buddy</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-gray-100 p-6 rounded-lg shadow-lg flex flex-col items-center">
            <FaBookOpen className="text-5xl text-pink-500 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Share Your Books</h3>
            <p className="text-lg text-gray-800 text-center">
              BookShare is a platform designed to facilitate the sharing of books among users. Whether you have a book you've already read and want to pass it on to someone else or you're looking for your next read without breaking the bank, BookShare is here to help.
            </p>
          </div>
          <div className="bg-gray-100 p-6 rounded-lg shadow-lg flex flex-col items-center">
            <FaUsers className="text-5xl text-pink-500 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Community Focused</h3>
            <p className="text-lg text-gray-800 text-center">
              Our mission is to promote a culture of sharing and community while also promoting literacy and access to books for everyone. With BookShare, you can discover new books, share your favorites with others, and contribute to a sustainable and eco-friendly way of consuming literature.
            </p>
          </div>
          <div className="bg-gray-100 p-6 rounded-lg shadow-lg flex flex-col items-center">
            <FaShareAlt className="text-5xl text-pink-500 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Join Us Today</h3>
            <p className="text-lg text-gray-800 text-center">
              Join our community today and start sharing the joy of reading!
            </p>
          </div>
        </div>
        <div className="text-center mt-8">
          <a href="/join" className="bg-pink-500 text-white py-2 px-6 rounded hover:bg-pink-600 transition duration-300">
            Join Now
          </a>
        </div>
      </div>
    </div>
  );
};

export default About;
