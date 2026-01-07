import React, { useState, useEffect } from "react";
import axios from "axios";
import TravelForm from "../components/TravelForm";
import ResultCard from "../components/ResultCard";
import { apiRequest } from "../api/request";

const Home = () => {
  const [data, setData] = useState(null);
  const [resultData, setResultData] = useState(null);

  const getHomeData = () => apiRequest("get", "/home");

  useEffect(() => {
    const fetchData = async () => {
      const data = await getHomeData();
      setData(data);
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen p-6 bg-slate-100">
      <h1 className="text-2xl text-center text-blue-900 font-semibold">
        TxTravel (Time Travel Simulator)
      </h1>

      <p className="text-sm text-center text-gray-500 italic mt-1">
        This isn’t magic. It’s time travel powered by science.
      </p>
      {/* <TravelForm /> */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-5">
        <TravelForm onResult={setResultData} />
        <ResultCard result={resultData} />
      </div>
    </div>
  );
};

export default Home;
