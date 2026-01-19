import React from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/register`,
        {
          name,
          email,
          password,
        },
        { withCredentials: true },
      );

      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="min-h-screen bg-slate-50 flex justify-center items-center">
      <form
        onSubmit={onSubmit}
        className="w-full max-w-sm flex flex-col gap-6 bg-white shadow-ld rounded-2xl p-6"
      >
        <h1 className="text-center text-xl font-medium text-amber-900">
          Time Travel Register
        </h1>
        <div className="flex flex-col gap-4">
          <label className="flex flex-col gap-3 text-sm font-medium text-gray-700">
            Name
            <input
              type="text"
              placeholder="Name"
              className="outline-none px-3 py-2 border focus:ring-2 focus:ring-sky-400 rounded-2xl"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </label>
          <label className="flex flex-col gap-3 text-sm font-medium text-gray-700">
            Email
            <input
              type="email"
              placeholder="eample@email.com"
              className="outline-none px-3 py-2 border focus:ring-2 focus:ring-sky-400 rounded-2xl"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <label className="flex flex-col gap-3 text-sm font-medium text-gray-700">
            Password
            <input
              type="password"
              placeholder="******"
              className="outline-none px-3 py-2 border focus:ring-2 focus:ring-sky-400 rounded-2xl"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
        </div>
        <button className="text-white bg-amber-500 py-2 rounded-2xl hover:bg-amber-600">
          Register
        </button>
      </form>
    </div>
  );
}

export default Register;
