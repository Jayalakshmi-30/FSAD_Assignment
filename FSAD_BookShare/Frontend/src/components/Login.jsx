import React from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";
import { FaUser, FaEnvelope, FaLock, FaUserTag } from 'react-icons/fa';

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const userInfo = {
      userName: data.userName,
      email: data.email,
      password: data.password,
      role: data.role,
    };
    await axios
      .post("http://localhost:4001/user/login", userInfo)
      .then((res) => {
        if (res.data) {
          toast.success("Loggedin Successfully");
          document.getElementById("my_modal_3").close();
          setTimeout(() => {
            window.location.reload();
            localStorage.setItem("Users", JSON.stringify(res.data.user));
          }, 1000);
        }
      })
      .catch((err) => {
        if (err.response) {
          toast.error("Error: " + err.response.data.message);
        }
      });
  };

  return (
    <div>
      <dialog id="my_modal_3" className="modal">
        <div className="modal-box w-[800px] bg-gradient-to-br from-white to-pink-50 rounded-2xl shadow-2xl p-8">
          <form onSubmit={handleSubmit(onSubmit)} method="dialog" className="w-full max-w-[600px] mx-auto">
            <Link
              to="/"
              className="absolute right-5 top-5 text-gray-500 hover:text-pink-500 transition-colors duration-300"
              onClick={() => document.getElementById("my_modal_3").close()}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </Link>

            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-gray-800 mb-1">Welcome Back!</h3>
              <p className="text-sm text-gray-600">Sign in to continue your reading journey</p>
            </div>

            <div className="space-y-4">
              <div className="relative">
                <FaUser className="absolute top-3 left-3 text-gray-400 text-lg" />
                <input
                  type="text"
                  placeholder="Username"
                  className="w-full pl-10 pr-4 py-2.5 text-base border-2 border-gray-200 rounded-lg focus:outline-none focus:border-pink-500 transition-colors duration-300"
                  {...register("userName", { required: true })}
                />
                {errors.userName && (
                  <span className="text-xs text-red-500 mt-0.5 block">Required field</span>
                )}
              </div>

              <div className="relative">
                <FaEnvelope className="absolute top-3 left-3 text-gray-400 text-lg" />
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full pl-10 pr-4 py-2.5 text-base border-2 border-gray-200 rounded-lg focus:outline-none focus:border-pink-500 transition-colors duration-300"
                  {...register("email", { required: true })}
                />
                {errors.email && (
                  <span className="text-xs text-red-500 mt-0.5 block">Required field</span>
                )}
              </div>

              <div className="relative">
                <FaLock className="absolute top-3 left-3 text-gray-400 text-lg" />
                <input
                  type="password"
                  placeholder="Password"
                  className="w-full pl-10 pr-4 py-2.5 text-base border-2 border-gray-200 rounded-lg focus:outline-none focus:border-pink-500 transition-colors duration-300"
                  {...register("password", { required: true })}
                />
                {errors.password && (
                  <span className="text-xs text-red-500 mt-0.5 block">Required field</span>
                )}
              </div>

              <div className="relative">
                <FaUserTag className="absolute top-3 left-3 text-gray-400 text-lg" />
                <select
                  className="w-full pl-10 pr-4 py-2.5 text-base border-2 border-gray-200 rounded-lg focus:outline-none focus:border-pink-500 transition-colors duration-300"
                  {...register("role", { required: true })}
                >
                  <option value="">Select Role</option>
                  <option value="reader">Reader</option>
                  <option value="book_owner_share">Book Owner to share books</option>
                  <option value="book_owner_reader">Book Owner and Reader</option>
                </select>
                {errors.role && (
                  <span className="text-xs text-red-500 mt-0.5 block">Please select a role</span>
                )}
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-pink-500 text-white text-base font-semibold py-2.5 rounded-lg hover:bg-pink-600 hover:text-white transform hover:scale-[1.02] transition-all duration-300 mt-6"
            >
              Login
            </button>

            <div className="flex justify-between items-center text-sm mt-4">
              <Link
                to="/forgot-password"
                className="text-pink-500 hover:text-pink-600 font-medium transition-colors duration-300"
              >
                Forgot Password?
              </Link>
              <p className="text-gray-600">
                Not registered?{" "}
                <Link
                  to="/signup"
                  className="text-pink-500 hover:text-pink-600 font-medium transition-colors duration-300"
                >
                  Sign up
                </Link>
              </p>
            </div>
          </form>
        </div>
      </dialog>
    </div>
  );
}

export default Login;
