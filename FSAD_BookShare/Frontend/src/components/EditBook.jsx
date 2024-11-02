import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

const EditBook = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    const [bookData, setBookData] = useState({
        name: '',
        title: '',
        price: '',
        category: '',
        image: '',
        bookOwner: '',
        contact: ''
    });

    useEffect(() => {
        const fetchBook = async () => {
            setIsLoading(true);
            try {
                const response = await axios.get(`http://localhost:4001/book/${id}`);
                const book = response.data;
                setBookData({
                    name: book.name,
                    title: book.title,
                    price: book.price,
                    category: book.category,
                    image: book.image,
                    bookOwner: book.bookOwner,
                    contact: book.contact
                });
            } catch (error) {
                toast.error("Error fetching book details");
                navigate('/BookList');
            } finally {
                setIsLoading(false);
            }
        };
        fetchBook();
    }, [id, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!bookData.name || !bookData.price || !bookData.category) {
            toast.error('Please fill in all required fields');
            return;
        }

        try {
            await axios.put(`http://localhost:4001/book/update/${id}`, bookData);
            toast.success('Book updated successfully');
            navigate('/BookList');
        } catch (error) {
            toast.error('Failed to update book');
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 pt-20">
            <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-lg">
                <h2 className="text-3xl font-bold text-pink-500 mb-8">Edit Book</h2>
                {isLoading ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pink-500"></div>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-gray-700 mb-2">Book Name *</label>
                            <input
                                type="text"
                                value={bookData.name}
                                onChange={(e) => setBookData({...bookData, name: e.target.value})}
                                className="w-full p-3 border rounded-lg focus:outline-none focus:border-pink-500"
                                placeholder="Book Name"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-gray-700 mb-2">Description</label>
                            <textarea
                                value={bookData.title}
                                onChange={(e) => setBookData({...bookData, title: e.target.value})}
                                className="w-full p-3 border rounded-lg focus:outline-none focus:border-pink-500"
                                placeholder="Book Description"
                                rows="4"
                            />
                        </div>

                        <div>
                            <label className="block text-gray-700 mb-2">Price *</label>
                            <input
                                type="number"
                                value={bookData.price}
                                onChange={(e) => setBookData({...bookData, price: e.target.value})}
                                className="w-full p-3 border rounded-lg focus:outline-none focus:border-pink-500"
                                placeholder="Price"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-gray-700 mb-2">Category *</label>
                            <select
                                value={bookData.category}
                                onChange={(e) => setBookData({...bookData, category: e.target.value})}
                                className="w-full p-3 border rounded-lg focus:outline-none focus:border-pink-500"
                                required
                            >
                                <option value="">Select Category</option>
                                <option value="Fiction">Fiction</option>
                                <option value="Non-Fiction">Non-Fiction</option>
                                <option value="Science">Science</option>
                                <option value="History">History</option>
                                <option value="Technology">Technology</option>
                                <option value="Free">Free</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-gray-700 mb-2">Image URL</label>
                            <input
                                type="text"
                                value={bookData.image}
                                onChange={(e) => setBookData({...bookData, image: e.target.value})}
                                className="w-full p-3 border rounded-lg focus:outline-none focus:border-pink-500"
                                placeholder="Image URL"
                            />
                        </div>

                        <div>
                            <label className="block text-gray-700 mb-2">Contact</label>
                            <input
                                type="text"
                                value={bookData.contact}
                                onChange={(e) => setBookData({...bookData, contact: e.target.value})}
                                className="w-full p-3 border rounded-lg focus:outline-none focus:border-pink-500"
                                placeholder="Contact"
                            />
                        </div>

                        <div className="flex gap-4 pt-4">
                            <button
                                type="submit"
                                className="bg-pink-500 text-white px-6 py-3 rounded-lg hover:bg-pink-600 transition-colors"
                            >
                                Update Book
                            </button>
                            <button
                                type="button"
                                onClick={() => navigate('/BookList')}
                                className="bg-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-400 transition-colors"
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
};

export default EditBook;
