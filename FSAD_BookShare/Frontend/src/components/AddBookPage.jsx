import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../context/AuthProvider";
import axios from "axios";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const AddBookPage = () => {
    const navigate = useNavigate();
    const [authUser] = useAuth();
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = async (data) => {
        try {
            const bookInfo = {
                name: data.name,
                title: data.title,
                price: Number(data.price),
                category: data.category,
                image: data.image,
                bookOwner: data.bookOwner,
                contact: data.contact,
                status: 'Available'
            };
    
            const res = await axios.post("http://localhost:4001/book/add", bookInfo);
            if (res.data) {
                toast.success("Book added successfully!");
                setTimeout(() => {
                    navigate('/BookList');
                }, 1500);
            }
        } catch (err) {
            console.log('Error details:', err);
            toast.error("Error: " + err.response?.data.message);
        }
    };
    
    

    return (
        <div className="min-h-screen bg-gray-50 pt-20">
            <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-lg">
                <h2 className="text-3xl font-bold text-pink-500 mb-8">Add New Book</h2>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div>
                        <input
                            type="text"
                            placeholder="Book Name"
                            className="w-full p-3 border rounded-lg"
                            {...register("name", { required: true })}
                        />
                        {errors.name && <span className="text-red-500">Required field</span>}
                    </div>

                    <div>
                        <textarea
                            placeholder="Book Description"
                            className="w-full p-3 border rounded-lg"
                            {...register("title", { required: true })}
                        />
                        {errors.title && <span className="text-red-500">Required field</span>}
                    </div>

                    <div>
                        <input
                            type="number"
                            placeholder="Price"
                            className="w-full p-3 border rounded-lg"
                            {...register("price", { required: true })}
                        />
                        {errors.price && <span className="text-red-500">Required field</span>}
                    </div>

                    <div>
                        <select
                            className="w-full p-3 border rounded-lg"
                            {...register("category", { required: true })}
                        >
                            <option value="">Select Category</option>
                            <option value="Fiction">Fiction</option>
                            <option value="Non-Fiction">Non-Fiction</option>
                            <option value="Science">Science</option>
                            <option value="History">History</option>
                            <option value="Technology">Technology</option>
                            <option value="Free">Free</option>
                        </select>
                        {errors.category && <span className="text-red-500">Required field</span>}
                    </div>

                    <div>
                        <input
                            type="text"
                            placeholder="Image URL"
                            className="w-full p-3 border rounded-lg"
                            {...register("image", { required: true })}
                        />
                        {errors.image && <span className="text-red-500">Required field</span>}
                    </div>

                    <div>
                    <input
                        type="text"
                        placeholder="Book Owner Name"
                        className="w-full p-3 border rounded-lg"
                        {...register("bookOwner", { required: true })}
                        defaultValue={authUser.fullname}
                    />
                    {errors.bookOwner && <span className="text-red-500">Required field</span>}
                </div>


                    <div>
                        <input
                            type="tel"
                            placeholder="Contact Number"
                            className="w-full p-3 border rounded-lg"
                            {...register("contact", { required: true })}
                        />
                        {errors.contact && <span className="text-red-500">Required field</span>}
                    </div>

                    <div className="flex gap-4">
                        <button
                            type="submit"
                            className="bg-pink-500 text-white px-6 py-3 rounded-lg hover:bg-pink-600"
                        >
                            Add Book
                        </button>
                        <button
                            type="button"
                            onClick={() => navigate('/BookList')}
                            className="bg-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-400"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddBookPage;
