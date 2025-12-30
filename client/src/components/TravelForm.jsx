import React, { useState } from "react";
import axios from "axios";

function TravelForm() {
  const [formData, setFormData] = useState({
    speed: 0.01,
    spaceYears: 0,
    earthAge: 0,
    direction: "Future",
  });

  const onSubmit = async (e) => {
    e.preventDefault();
    const { speed, spaceYears, earthAge, direction } = formData;
    const userId = localStorage.getItem("userId");
    try {
      const res = await axios.post("http://localhost:5000/api/travel", {
        speed,
        spaceYears,
        earthAge,
        direction,
        userId,
      });
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="bg-white p-6 rounded-xl shadow-2xl">
      <form onSubmit={onSubmit} className="space-y-6">
        <h1 className="text-xl font-extralight text-center">
          Choose speed. Bend time.
        </h1>
        <div className="flex flex-col gap-3">
          <label className="text-cyan-400 font-mono mb-2">
            Travel Speed: <span className="font-bold">{formData.speed}c</span> (
            c - light speed)
          </label>
          <input
            type="range"
            min={0.01}
            max={0.99}
            step={0.01}
            className="w-full accent-cyan-500 h-2 rounded-lg cursor-pointer"
            value={formData.speed}
            onChange={(e) =>
              setFormData({ ...formData, speed: parseFloat(e.target.value) })
            }
          />
        </div>
        <div className="flex flex-col gap-4">
          <label className="flex flex-col gap-4">
            <p className="text-cyan-400 font-mono">
              Space Years (How long do you want to travel?)
            </p>
            <input
              type="number"
              value={formData.spaceYears}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  spaceYears: parseFloat(e.target.value),
                })
              }
              className="py-2 px-4 border focus:ring-2 focus:ring-amber-600 rounded-2xl"
            />
          </label>
          <label className="flex flex-col gap-4">
            <p className="text-cyan-400 font-mono">
              Earth Age (Currently how old are you?)
            </p>
            <input
              type="number"
              value={formData.earthAge}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  earthAge: parseFloat(e.target.value),
                })
              }
              className="py-2 px-4 border focus:ring-2 focus:ring-amber-600 rounded-2xl"
            />
          </label>
          <label className="flex flex-col gap-4">
            <p className="text-cyan-400 font-mono">
              Direction (How long do you want to travel?)
            </p>
            <select
              name="direction"
              className="py-2 px-4 border focus:ring-2 focus:ring-amber-600 rounded-2xl"
            >
              <option value="future">Future</option>
              <option value="past">Past</option>
            </select>
          </label>
        </div>
        <div className="flex justify-center">
          <button
            type="submit"
            className="py-2 px-7 bg-cyan-600 rounded-2xl text-white hover:bg-cyan-700 cursor-pointer"
          >
            Start Travel
          </button>
        </div>
      </form>
    </div>
  );
}

export default TravelForm;
