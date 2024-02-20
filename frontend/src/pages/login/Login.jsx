import React from "react";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="flex flex-col justify-center items-center min-w-96 mx-auto">
      <div className="w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
        <h1 className="text-3xl font-semibold text-center text-gray-300">
          Login<span className="text-blue-500">ChatApp</span>
        </h1>
        <form className="text-white">
          <div>
            <lable className="label p-2">
              <span className="text-base label-text ">Username</span>
            </lable>
            <input
              type="text"
              placeholder="Enter username"
              className="input w-full h-10 input-bordered"
            />
          </div>
          <div>
            <lable className="label p-2">
              <span className="text-base label-text">Password</span>
            </lable>
            <input
              type="text"
              placeholder="Enter Password"
              className="input w-full h-10 input-bordered"
            />
          </div>
          <Link
            to={"/signup"}
            className="tet-sm hover:underline hover:text-blue-600 mt-2 inline-block"
          >
            Don't have an account?
          </Link>
          <div>
            <button className="btn btn-block btn-sm mt-2">Login</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
