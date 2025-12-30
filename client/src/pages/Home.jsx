import React, { useState, useEffect } from "react";
import TravelForm from "../components/TravelForm";
import ResultCard from "../components/ResultCard";

const Home = () => {
  const getToken = async () => {
    try {
      const token = localStorage.getItem("accessToken");

      await axios.get("http://localhost:5000/api/home", {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });
    } catch (error) {
      if (error.response?.status === 401) {
        try {
          const refreshRes = await axios.post(
            "http://localhost:5000/api/refresh",
            {},
            { withCredentials: true }
          );
          localStorage.setItem("accessToken", refreshRes.data.accessToken);
        } catch (error) {
          localStorage.removeItem("accessToken");
          navigate("/login");
        }
      }
    }
  };
  useEffect(() => {
    getToken();
  }, []);

  return (
    <div className="min-h-screen p-6 bg-slate-100">
      <h1 className="text-2xl text-center text-blue-900 font-semibold">
        TxTravel (Time Travel Simulator)
      </h1>
      <p className="text-sm text-center text-gray-500 mt-1">
        This isn’t magic. It’s time travel powered by science.
      </p>
      {/* <TravelForm /> */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-5">
        <TravelForm />
        <ResultCard />
      </div>
    </div>
  );
};

export default Home;
