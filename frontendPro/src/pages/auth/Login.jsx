import React from "react";
import { useForm } from "react-hook-form";

import { Link, useNavigate } from "react-router-dom";
import loginImg from "../../assets/login.webp";
import { loginUser } from "../../redux/slices/authSlice";
import {useDispatch,useSelector } from "react-redux"
const Login = () => {

const dispatch = useDispatch()
 const navigate = useNavigate();

  const { loading, error, user } = useSelector((state) => state.auth);



  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    // console.log("Login Data:", data);
    dispatch(loginUser(data))
  };

  return (
    <div className="flex">
      {/* Left Side Form */}
      <div className="w-full flex flex-col justify-center items-center p-8 md:w-1/2 md:p-12">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="max-w-md w-full shadow-sm bg-white p-8 rounded-lg border"
        >
          <div className="justify-center flex mb-6">
            <h2 className="text-xl font-medium">Rabbit</h2>
          </div>

          <h2 className="text-2xl font-bold text-center mb-6">
            Welcome Back!
          </h2>

          <p className="text-center mb-6">
            Enter your email and password to login
          </p>

          {/* Email */}
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2">
              Email
            </label>
            <input
              type="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Invalid email address",
                },
              })}
              className="w-full p-2 border rounded"
              placeholder="Enter your email"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2">
              Password
            </label>
            <input
              type="password"
              {...register("password", {
                required: "Password is required",
              })}
              className="w-full p-2 border rounded"
              placeholder="Enter your password"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-black text-white rounded-lg font-semibold hover:bg-gray-800 transition p-2"
          >
            Sign In
          </button>

          <p className="text-center mt-6 text-sm">
            Don’t have an account?{" "}
            <Link to="/register" className="text-blue-500">
              Register
            </Link>
          </p>
        </form>
      </div>

      {/* Right Side Image */}
      <div className="hidden md:block bg-gray-800 w-1/2">
        <div className="flex h-full justify-center items-center">
          <img
            src={loginImg}
            alt="Login to Account"
            className="h-[750px] w-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default Login;