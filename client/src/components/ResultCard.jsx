import React from "react";
import { calculateTime } from "../utils/calculateTime.js";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
function ResultCard({ result }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const userId = localStorage.getItem("userId");

  const navigate = useNavigate();

  if (
    !result ||
    result.speed == null ||
    result.spaceYears == null ||
    result.earthAge == null
  ) {
    return (
      <div className="bg-blue-950 p-6 rounded-2xl flex items-center justify-center">
        <div className="bg-amber-500 p-6 rounded-xl mt-4 flex items-center justify-center">
          <p className="text-gray-500 font-semibold text-center">
            Fill the form to see the mission output
          </p>
        </div>
      </div>
    );
  }
  const speed = result.speed;
  const spaceYears = result.spaceYears;
  const earthAge = result.earthAge;
  const direction = result.direction;
  const destination = result.destination;
  const earthYears = calculateTime(spaceYears, speed);
  const actualAge = earthAge + spaceYears;
  const friendAge = earthAge + earthYears;

  const onSubmit = async () => {
    setLoading(true);
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/time-travel`,
        {
          speed,
          spaceYears,
          earthYears,
          actualAge,
          friendAge,
          direction,
          destination,
          userId,
        },
      );

      console.log(res.data);
      setData(res.data);
      navigate(`/result/${res.data._id}`);
    } catch (error) {
      error;
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full bg-blue-950 p-6 rounded-2xl shadow-2xl">
      <h1 className="text-cyan-500 text-2xl font-bold text-center">
        Mission Output
      </h1>
      <p className="text-gray-300 text-center mt-2">
        Your results based relativity time dialation
      </p>
      <div className="bg-blue-900 p-6 rounded-xl mt-6 grid gap-3">
        <div className="bg-blue-800 flex justify-between items-center p-3 rounded-xl">
          <span className="font-medium text-gray-300">Travel Time:</span>
          <span className="text-cyan-300 font-semibold text-lg">
            {" "}
            {spaceYears} yrs
          </span>
        </div>

        <div className="bg-blue-800 flex justify-between items-center p-3 rounded-xl">
          <span className="text-gray-300 font-medium">Earth Time Passed:</span>
          <span className="text-cyan-300 font-semibold text-lg">
            {" "}
            {earthYears} yrs
          </span>
        </div>
        <div className="bg-blue-800 flex justify-between items-center p-3 rounded-xl">
          <span className="text-gray-300 font-medium">
            Your age after trip:
          </span>
          <span className="text-cyan-300 font-semibold text-lg">
            {" "}
            {actualAge} yrs
          </span>
        </div>
        <div className="bg-blue-800 flex justify-between items-center p-3 rounded-xl">
          <span className="text-gray-300 font-medium">Direction:</span>
          <span className="text-cyan-300 font-semibold text-lg">
            {" "}
            {direction}
          </span>
        </div>

        <div className="bg-blue-800 flex justify-between items-center p-3 rounded-xl">
          <span className="text-gray-300 font-medium">
            Your Friend's age on earth:
          </span>
          <span className="text-cyan-300 font-semibold text-lg">
            {" "}
            {friendAge.toFixed(3)} yrs
          </span>
        </div>
        <div className="bg-blue-800 flex justify-between items-center p-3 rounded-xl">
          <span className="text-gray-300 font-medium">Time dialation:</span>
          <span className="text-cyan-300 font-semibold text-lg">
            {" "}
            {(earthYears - spaceYears).toFixed(3)} yrs
          </span>
        </div>
      </div>
      <div className="flex justify-center mt-4">
        <button
          onClick={onSubmit}
          className="bg-cyan-400 w-full py-3 px-8 text-white text-lg font-semibold rounded-2xl hover:bg-cyan-300 cursor-pointer"
        >
          {loading ? "Treaveling...." : "Begin Time Travel"}
        </button>
      </div>
    </div>
  );
}

export default ResultCard;
