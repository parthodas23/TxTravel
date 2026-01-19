import React from "react";
import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/login`,
        {
          email,
          password,
        },
        { withCredentials: true },
      );

      localStorage.setItem("userId", res.data.userId);
      localStorage.setItem("accessToken", res.data.accessToken);
      navigate("/");
      alert("Login Successfull");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <form
        onSubmit={onSubmit}
        className="w-full max-w-sm bg-white shadow-lg p-6 flex flex-col gap-6"
      >
        <h1 className="text-center font-medium text-2xl text-amber-900">
          Time Travel Login
        </h1>
        <div className="flex flex-col gap-4">
          <label className="flex flex-col text-sm font-medium text-gray-700">
            Email
            <input
              className="mt-1 outline-none border px-3 py-2 rounded-2xl focus:ring-2 focus:ring-sky-400"
              type="email"
              placeholder="example@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <label className="flex flex-col text-sm font-medium text-gray-700">
            Password
            <input
              className="mt-1 outline-none border px-3 py-2 rounded-2xl focus:ring-2 focus:ring-sky-400"
              type="text"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
        </div>
        <div>
          Don't have account?{" "}
          <Link className="text-blue-800 font-semibold" to="/register">
            SignUp
          </Link>
        </div>
        <button className="px-3 py-2 mt-1 bg-amber-500 rounded-2xl text-white hover:bg-amber-600 cursor-pointer">
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
