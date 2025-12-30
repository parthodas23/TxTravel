import React from "react";

function ResultCard() {
  const getData = async () => {};
  return (
    <div className="w-full bg-blue-950 p-6 rounded-2xl shadow-2xl">
      <h1 className="text-green-600 text-2xl font-bold text-center">
        Mission Output
      </h1>
      <div className="bg-amber-500 p-6 rounded-xl mt-4 flex flex-col gap-4">
        <h1 className="text-xl font-mono">Now your age in earth 24</h1>
        <p>Space Years: 2</p>
        <p>Direction: Future</p>
        <p>Time dialation: 2.5 years</p>
        <p>Now you're 2.5 year younger then your present self</p>
      </div>
    </div>
  );
}

export default ResultCard;
