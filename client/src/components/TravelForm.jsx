import React, { useState } from "react";
import axios from "axios";

function TravelForm({ onResult }) {
  const [formData, setFormData] = useState({
    speed: 0.01,
    spaceYears: null,
    earthAge: null,
    direction: "future",
    destination: "",
  });
  const [directionError, setDirectionError] = useState("");


  onResult(formData);
  return (
    <div className="bg-white p-6 rounded-xl shadow-2xl">
      <form className="space-y-6">
        <h1 className="text-xl font-extralight text-center">
          Choose speed. Bend time.
        </h1>
        <div className="flex flex-col gap-3">
          <label className="text-cyan-400 font-mono mb-2">
            Travel Speed: <span className="font-bold">{formData.speed}c</span>{" "}
            (c-light speed)
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
              placeholder="Travel years"
              onChange={(e) =>
                setFormData({
                  ...formData,
                  spaceYears: parseFloat(e.target.value),
                })
              }
              className="py-2 px-4 border focus:ring-2 focus:ring-amber-600 rounded-2xl font-semibold"
            />
          </label>
          <label className="flex flex-col gap-4">
            <p className="text-cyan-400 font-mono">
              Earth Age (Currently how old are you?)
            </p>
            <input
              type="number"
              placeholder="Your Age"
              value={formData.earthAge}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  earthAge: parseFloat(e.target.value),
                })
              }
              className="py-2 px-4 border focus:ring-2 focus:ring-amber-600 rounded-2xl font-semibold"
            />
          </label>
          <label className="flex flex-col gap-3">
            <p className="text-cyan-400 font-mono">
              Direction (How long do you want to travel?)
            </p>
            <select
              name="direction"
              className="py-2 px-4 border focus:ring-2 focus:ring-amber-600 rounded-2xl font-semibold"
              value={formData.direction}
              onChange={(e) => {
                const value = e.target.value;
                // if (value === "past") {
                //   setDirectionError(
                //     "Past time travel isn't possible with current physics"
                //   );
                //   setFormData({ ...formData, direction: "future" });
                // }
                setFormData({ ...formData, direction: value });
              }}
            >
              <option value="future">Future</option>
              <option disabled value="past">
                Past
              </option>
            </select>

            <div className="text-red-400 text-sm font-mono italic">
              Past time travel isn't possible with current physics
            </div>
          </label>
          <label className="flex flex-col gap-4">
            <p className="text-cyan-400 font-mono">
              Destination (Where would you like to go?)
            </p>
            <input
              type="text"
              placeholder="Anciant Egypt, Mars Colony"
              value={formData.destination}
              onChange={(e) =>
                setFormData({ ...formData, destination: e.target.value })
              }
              className="py-2 px-4 border focus:ring-2 focus:ring-amber-400 rounded-2xl font-semibold"
            />
          </label>
        </div>
      </form>
    </div>
  );
}

export default TravelForm;
