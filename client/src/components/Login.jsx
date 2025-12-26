import React from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:5000/api/login",
        {
          email,
          password,
        },
        { withCredentials: true }
      );
      localStorage.setItem("accessToken", res.data.accessToken);
      navigate("/");
      alert("Login Successfull");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="m-20">
      <form onSubmit={onSubmit} className="flex gap-10 flex-col">
        <h1>Time Travel Login</h1>
        <div className="flex flex-col ">
          <input
            placeholder="email address"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            placeholder="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button>Login</button>
      </form>
    </div>
  );
}

export default Login;
