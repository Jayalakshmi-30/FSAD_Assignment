import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";
import { FaUser, FaEnvelope, FaLock, FaUserTag, FaQuestion, FaKey } from 'react-icons/fa';
import Login from "./Login";

function Signup() {
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    const userInfo = {
      fullname: data.fullname,
      email: data.email,
      password: data.password,
      role: data.role,
      secretQuestion: data.secretQuestion,
      secretAnswer: data.secretAnswer
    };
    await axios
      .post("http://localhost:4001/user/signup", userInfo)
      .then((res) => {
        if (res.data) {
          toast.success("Signup Successfully");
          navigate(from, { replace: true });
          localStorage.setItem("Users", JSON.stringify(res.data.user));
        }
      })
      .catch((err) => {
        if (err.response) {
          toast.error("Error: " + err.response.data.message);
        }
      });
  };

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="w-[800px] bg-gradient-to-br from-white to-pink-50 rounded-2xl shadow-2xl p-8">
        <form onSubmit={handleSubmit(onSubmit)} method="dialog" className="w-full max-w-[600px] mx-auto">
          <Link to="/" className="absolute right-5 top-5 text-gray-500 hover:text-pink-500 transition-colors duration-300">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </Link>

          <div className="text-center mb-6">
            <h3 className="text-2xl font-bold text-gray-800 mb-1">Create Account</h3>
            <p className="text-sm text-gray-600">Join our reading community today</p>
          </div>

          <div className="space-y-4">
            <div className="relative">
              <FaUser className="absolute top-3 left-3 text-gray-400 text-lg" />
              <input
                type="text"
                placeholder="Full Name"
                className="w-full pl-10 pr-4 py-2.5 text-base border-2 border-gray-200 rounded-lg focus:outline-none focus:border-pink-500 transition-colors duration-300"
                {...register("fullname", { required: true })}
              />
              {errors.fullname && <span className="text-xs text-red-500 mt-0.5 block">Required field</span>}
            </div>

            <div className="relative">
              <FaEnvelope className="absolute top-3 left-3 text-gray-400 text-lg" />
              <input
                type="email"
                placeholder="Email Address"
                className="w-full pl-10 pr-4 py-2.5 text-base border-2 border-gray-200 rounded-lg focus:outline-none focus:border-pink-500 transition-colors duration-300"
                {...register("email", { required: true })}
              />
              {errors.email && <span className="text-xs text-red-500 mt-0.5 block">Required field</span>}
            </div>

            <div className="relative">
              <FaLock className="absolute top-3 left-3 text-gray-400 text-lg" />
              <input
                type="password"
                placeholder="Password"
                className="w-full pl-10 pr-4 py-2.5 text-base border-2 border-gray-200 rounded-lg focus:outline-none focus:border-pink-500 transition-colors duration-300"
                {...register("password", { required: true })}
              />
              {errors.password && <span className="text-xs text-red-500 mt-0.5 block">Required field</span>}
            </div>

            <div className="relative">
              <FaUserTag className="absolute top-3 left-3 text-gray-400 text-lg" />
              <select
                className="w-full pl-10 pr-4 py-2.5 text-base border-2 border-gray-200 rounded-lg focus:outline-none focus:border-pink-500 transition-colors duration-300"
                {...register("role", { required: true })}
              >
                <option value="" className="text-gray-800">Select Role</option>
                <option value="reader" className="text-gray-800">Reader</option>
                <option value="book_owner_share" className="text-gray-800">Book Owner to share books</option>
                <option value="book_owner_reader" className="text-gray-800">Book Owner and Reader</option>
              </select>
              {errors.role && <span className="text-xs text-red-500 mt-0.5 block">Please select a role</span>}
            </div>

            <div className="relative">
              <FaQuestion className="absolute top-3 left-3 text-gray-400 text-lg" />
              <select
                className="w-full pl-10 pr-4 py-2.5 text-base border-2 border-gray-200 rounded-lg focus:outline-none focus:border-pink-500 transition-colors duration-300"
                {...register("secretQuestion", { required: true })}
              >
                <option value="" className="text-gray-800">Select Security Question</option>
                <option value="pet" className="text-gray-800">What was your first pet's name?</option>
                <option value="school" className="text-gray-800">What was the name of your first school?</option>
                <option value="city" className="text-gray-800">In which city were you born?</option>
                <option value="mother" className="text-gray-800">What is your mother's maiden name?</option>
              </select>
              {errors.secretQuestion && <span className="text-xs text-red-500 mt-0.5 block">Please select a question</span>}
            </div>

            <div className="relative">
              <FaKey className="absolute top-3 left-3 text-gray-400 text-lg" />
              <input
                type="text"
                placeholder="Security Answer"
                className="w-full pl-10 pr-4 py-2.5 text-base border-2 border-gray-200 rounded-lg focus:outline-none focus:border-pink-500 transition-colors duration-300"
                {...register("secretAnswer", { required: true })}
              />
              {errors.secretAnswer && <span className="text-xs text-red-500 mt-0.5 block">Required field</span>}
            </div>
          </div>

          <div className="mt-8 space-y-6">
            <button
              type="submit"
              className="w-full bg-pink-500 text-white text-base font-semibold py-2.5 rounded-lg hover:bg-pink-600 hover:text-white transform hover:scale-[1.02] transition-all duration-300"
            >
              Sign Up
            </button>

            <div className="flex justify-center items-center text-sm">
              <p className="text-gray-600">
                Already have an account? {" "}
              </p>
              <button
                  className="text-pink-500 hover:text-pink-600 font-medium transition-colors duration-300"
                  onClick={() => document.getElementById("my_modal_3").showModal()}
                >
                  Login
                </button>
            </div>
            
          </div>
        </form>
      </div>
      <Login />
    </div>
  );
}

export default Signup;
