import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import axios from 'axios';
import toast from 'react-hot-toast';
import { FaBook, FaStar, FaComments } from 'react-icons/fa';

function ReviewPage() {
    const navigate = useNavigate();
    const [books, setBooks] = useState([]);
    const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm({
        defaultValues: {
            rating: 0,
            bookTitle: '',
            comment: ''
        }
    });

    useEffect(() => {
        const fetchBooks = async () => {
            const response = await axios.get("http://localhost:4001/book");
            setBooks(response.data);
        };
        fetchBooks();
    }, []);

    const onSubmit = async (data) => {
        try {
            toast.success('Review submitted successfully! Thank you.');
            setTimeout(() => {
                navigate('/BookList');
            }, 2000);
        } catch (error) {
            toast.error('Failed to submit review');
        }
    };

    return (
        <div className="flex h-screen items-center justify-center">
            <div className="w-[800px] bg-gradient-to-br from-white to-pink-50 rounded-2xl shadow-2xl p-8">
                <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-[600px] mx-auto">
                    <Link to="/" className="absolute right-5 top-5 text-gray-500 hover:text-pink-500 transition-colors duration-300">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </Link>

                    <div className="text-center mb-6">
                        <h3 className="text-2xl font-bold text-gray-800 mb-1">Share Your Review</h3>
                        <p className="text-sm text-gray-600">Help others discover great books</p>
                    </div>

                    <div className="space-y-4">
                        <div className="relative">
                            <FaBook className="absolute top-3 left-3 text-gray-400 text-lg" />
                            <select
                                className="w-full pl-10 pr-4 py-2.5 text-base border-2 border-gray-200 rounded-lg focus:outline-none focus:border-pink-500 transition-colors duration-300"
                                {...register("bookTitle", { required: true })}
                            >
                                <option value="">Select a Book</option>
                                {books.map(book => (
                                    <option key={book._id} value={book.name}>{book.name}</option>
                                ))}
                            </select>
                            {errors.bookTitle && <span className="text-xs text-red-500 mt-0.5 block">Please select a book</span>}
                        </div>

                        <div className="relative p-4 border-2 border-gray-200 rounded-lg">
                            <label className="block text-gray-700 mb-2">Rating</label>
                            <div className="flex justify-center gap-4">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <FaStar
                                        key={star}
                                        className={`text-3xl cursor-pointer ${
                                            star <= watch("rating") 
                                            ? "text-yellow-400" 
                                            : "text-gray-300"
                                        } hover:text-yellow-400 transition-colors duration-300`}
                                        onClick={() => setValue("rating", star)}
                                    />
                                ))}
                            </div>
                            {errors.rating && (
                                <span className="text-xs text-red-500 mt-2 block text-center">
                                    Please select a rating
                                </span>
                            )}
                        </div>

                        <div className="relative">
                            <FaComments className="absolute top-3 left-3 text-gray-400 text-lg" />
                            <textarea
                                className="w-full pl-10 pr-4 py-2.5 text-base border-2 border-gray-200 rounded-lg focus:outline-none focus:border-pink-500 transition-colors duration-300 h-32 resize-none"
                                placeholder="Write your review..."
                                {...register("comment", { required: true })}
                            />
                            {errors.comment && <span className="text-xs text-red-500 mt-0.5 block">Please write your review</span>}
                        </div>
                    </div>

                    <div className="mt-8">
                        <button
                            type="submit"
                            className="w-full bg-pink-500 text-white text-base font-semibold py-2.5 rounded-lg hover:bg-pink-600 hover:text-white transform hover:scale-[1.02] transition-all duration-300"
                        >
                            Submit Review
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default ReviewPage;
