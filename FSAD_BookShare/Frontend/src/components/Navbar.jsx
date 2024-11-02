import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import { FaBars, FaTimes, FaCog, FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaBook } from 'react-icons/fa';
import Login from "./Login";
import Logout from "./Logout";
import { useAuth } from "../context/AuthProvider";

function Navbar({cartCount}) {
    const [authUser, setAuthUser] = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [theme, setTheme] = useState(
        localStorage.getItem("theme") ? localStorage.getItem("theme") : "light"
    );
    const [sticky, setSticky] = useState(false);
    const element = document.documentElement;

    useEffect(() => {
        if (theme === "dark") {
            element.classList.add("dark");
            localStorage.setItem("theme", "dark");
            document.body.classList.add("dark");
        } else {
            element.classList.remove("dark");
            localStorage.setItem("theme", "light");
            document.body.classList.remove("dark");
        }
    }, [theme]);

    useEffect(() => {
        const handleScroll = () => {
            setSticky(window.scrollY > 0);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        const cartCount1 = localStorage.getItem("cartCount");
        if (cartCount1) {
            cartCount = parseInt(cartCount1);
        }
    }, []);

    const UserDrawer = () => {
        const userDetails = JSON.parse(localStorage.getItem('user'));
        const [showAddBookForm, setShowAddBookForm] = useState(false);
        const [bookData, setBookData] = useState({
            name: '',
            author: '',
            genre: 'Fiction',
            location: '',
            price: '',
            description: '',
            image: ''
        });

        const handleAddBook = async (e) => {
            e.preventDefault();
            try {
                const response = await fetch('/api/books/add', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(bookData)
                });

                if (response.ok) {
                    setShowAddBookForm(false);
                    setBookData({
                        name: '',
                        author: '',
                        genre: 'Fiction',
                        location: '',
                        price: '',
                        description: '',
                        image: ''
                    });
                }
            } catch (error) {
                console.error('Error adding book:', error);
            }
        };

        return (
            <>
                <div className={`fixed top-0 left-0 h-full w-80 bg-white shadow-2xl transform transition-transform duration-300 ease-in-out ${
                    isDrawerOpen ? 'translate-x-0' : '-translate-x-full'
                } z-50 overflow-y-auto`}>
                    <div className="p-6">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-bold text-gray-800">Profile</h2>
                            <button
                                onClick={() => setIsDrawerOpen(false)}
                                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                            >
                                <FaTimes className="text-gray-600 text-xl" />
                            </button>
                        </div>

                        <div className="space-y-6">
                            <div className="flex items-center space-x-4">
                                <div className="bg-pink-100 p-3 rounded-full">
                                    <FaUser className="text-pink-500 text-xl" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-gray-800">{userDetails?.name}</h3>
                                    <p className="text-sm text-gray-500">User Profile</p>
                                </div>
                            </div>

                            <div className="space-y-4 bg-gray-50 p-4 rounded-lg">
                                <div className="flex items-center gap-3">
                                    <FaEnvelope className="text-gray-500" />
                                    <div>
                                        <p className="text-sm text-gray-500">Email</p>
                                        <p className="text-gray-800">{authUser?.email}</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3">
                                    <FaPhone className="text-gray-500" />
                                    <div>
                                        <p className="text-sm text-gray-500">Phone</p>
                                        <p className="text-gray-800">8123665577</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3">
                                    <FaMapMarkerAlt className="text-gray-500" />
                                    <div>
                                        <p className="text-sm text-gray-500">Location</p>
                                        <p className="text-gray-800">Bangalore</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3">
                                    <FaBook className="text-gray-500" />
                                    <div>
                                        <p className="text-sm text-gray-500">Interests</p>
                                        <p className="text-gray-800">Spiritual, Novels</p>
                                    </div>
                                </div>
                            </div>

                            {authUser?.role === 'book_owner_share' && (
                                <div className="pt-4 border-t">
                                    <button
                                        onClick={() => {
                                            navigate('/addbook');
                                            setIsDrawerOpen(false);
                                        }}
                                        className="flex items-center gap-2 text-gray-600 hover:text-pink-500 transition-colors"
                                    >
                                        <FaBook />
                                        <span>Add Book</span>
                                    </button>
                                </div>
                            )}

                            <div className="pt-4 border-t">
                                <button className="flex items-center gap-2 text-gray-600 hover:text-pink-500 transition-colors">
                                    <FaCog />
                                    <span>Settings</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                {isDrawerOpen && (
                    <div
                        className="fixed inset-0 bg-black bg-opacity-50 z-40"
                        onClick={() => setIsDrawerOpen(false)}
                    />
                )}
            </>
        );
    };

    const navItems = (
        <>
            <li className="mx-2">
                <a href="/" className="bg-pink-500 text-white px-3 py-2 rounded-md hover:bg-pink-600 duration-300">Home</a>
            </li>
            <li className="mx-2">
                <a href="/BookList" className="bg-pink-500 text-white px-3 py-2 rounded-md hover:bg-pink-600 duration-300">Book List</a>
            </li>
            <li className="mx-2">
                <a href="/cart" className="bg-pink-500 text-white px-3 py-2 rounded-md hover:bg-pink-600 duration-300">Cart ({cartCount})</a>
            </li>
            <li className="mx-2">
                <a href="/ContactDetails" className="bg-pink-500 text-white px-3 py-2 rounded-md hover:bg-pink-600 duration-300">Contact</a>
            </li>
            <li className="mx-2">
                <a href="/About" className="bg-pink-500 text-white px-3 py-2 rounded-md hover:bg-pink-600 duration-300">About</a>
            </li>
        </>
    );

    return (
        <>
            <div className={`max-w-screen-2xl container mx-auto md:px-20 px-4 dark:bg-slate-800 dark:text-white fixed top-0 left-0 right-0 z-50 ${
                sticky ? "sticky-navbar shadow-md bg-base-200 dark:bg-slate-700 dark:text-white duration-300 transition-all ease-in-out" : ""
            }`}>
                <div className="navbar">
                    <div className="navbar-start flex items-center">
                        {authUser && (
                            <button
                                className="mr-4"
                                onClick={() => setIsDrawerOpen(true)}
                            >
                                <FaBars className="text-2xl text-pink-500 hover:text-pink-600 transition-colors" />
                            </button>
                        )}
                        <div className="dropdown ml-4">
                            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
                                </svg>
                            </div>
                            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                                {navItems}
                            </ul>
                        </div>
                        <a className="text-2xl font-bold cursor-pointer text-pink-300">Book Buddy</a>
                    </div>
                    <div className="navbar-end space-x-3">
                        <div className="navbar-center hidden lg:flex">
                            <ul className="menu menu-horizontal px-1">{navItems}</ul>
                        </div>
                        <label className="swap swap-rotate">
                            <input type="checkbox" className="theme-controller" value="synthwave" />
                        </label>
                        {authUser ? (
                            <Logout />
            ) : (
              <div className="">
                <a 
                  className="bg-black text-white px-3 py-2 rounded-md hover:bg-slate-800 duration-300 cursor-pointer" 
                  onClick={() => document.getElementById("my_modal_3").showModal()}
                >
                  Login
                </a>
                <Login />
              </div>
            )}
          </div>
        </div>
      </div>
      <UserDrawer />
    </>
  );
}

export default Navbar;
