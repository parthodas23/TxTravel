import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Home() {
  const [data, setData] = useState("");
  const [speed, setSpeed] = useState("");
  const [spaceYears, setSpaceYears] = useState("");
  const [direction, setDirection] = useState("future");

  const navigate = useNavigate();
  const uuid = crypto.randomUUID();

  let userId = localStorage.getItem("userId");
  if (!userId) {
    localStorage.setItem("userId", uuid);
    userId = localStorage.getItem("userId");
  }

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/travel", {
        speed,
        spaceYears,
        direction,
        userId: userId,
      });

      setData(res.data);
      console.log(data);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="h-screen flex items-center flex-col overflow-auto">
      <h1 className="text-gray-700 text-4xl text-center mt-10 font-extralight">
        Time Travel Simulator
      </h1>

      <h3 className="text-blue-500 text-center font-extralight text-2xl mt-10">
        Simulate time dilation and see how many years pass on Earth while you
        travel through space.
      </h3>

      <form
        onSubmit={onSubmit}
        className=" h-auto w-[600px] bg-fuchsia-100 mt-7 rounded-2xl shadow-2xl mb-10"
      >
        <h1 className="text-xl text-indigo-400 m-3 text-center">
          Try a Experiance
        </h1>
        <div className="flex flex-col gap-10 ml-10">
          <div>
            <p className="font-semibold mb-5">
              How much speed would you like to take while travel? (must be
              within 0-1c)
            </p>
            <input
              type="text"
              placeholder="Speed"
              value={speed}
              onChange={(e) => setSpeed(e.target.value)}
              className="outline-none border-2 border-gray-500 px-3 py-1.5 rounded-2xl hover:border-cyan-600"
            />
          </div>
          <div>
            <h1 className="font-semibold mb-5">
              How many years do you want to stay in space?
            </h1>
            <input
              type="text"
              placeholder="Space Years"
              value={spaceYears}
              onChange={(e) => setSpaceYears(e.target.value)}
              className="outline-none border-2 border-gray-500 px-3 py-1.5 rounded-2xl hover:border-cyan-600"
            />
          </div>
          <div>
            <div>
              <h1 className="font-semibold mb-5">
                Which time direction do you want to go?
              </h1>
              <select
                value={direction}
                onChange={(e) => setDirection(e.target.value)}
                name="duration"
                className="outline-none border-2 border-gray-500 px-3 py-1.5 rounded-2xl hover:border-cyan-600"
              >
                <option value="future">Future</option>
                <option value="past">Past</option>
              </select>
            </div>
          </div>
        </div>
        <button className="mt-10 bg-indigo-400 text-white rounded-xl mb-4 text-center cursor-pointer w-full py-1.5 hover:bg-indigo-500">
          Start Time Travel
        </button>
      </form>
    </div>
  );
}

export default Home;
