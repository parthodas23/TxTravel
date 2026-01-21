import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
function Result() {
  const id = useParams();
  const [data, setData] = useState("");

  console.log(id.travelId);
  const getData = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/travel-data/${id.travelId}`,
      );

      setData(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  console.log(data ? data : "");

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="h-screen bg-slate-100 p-4 md:p-6 flex flex-col">
      <h1 className="text-center mb-6 text-2xl md:text-3xl font-semibold text-slate-800">
        Travel Summary
      </h1>

      <div className="flex-1 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-[320px_1fr] gap-4 md:gap-6 overflow-hidden">
        {/* Trip Details */}
        <div className="bg-white rounded-xl p-4 md:p-6 shadow h-fit">
          <h2 className="text-lg font-medium text-slate-700 mb-4">
            Trip Details
          </h2>

          {data && (
            <ul className="space-y-3 text-slate-600 text-sm md:text-base">
              <li>
                <span className="font-medium">Speed:</span> {data.speed}c
              </li>
              <li>
                <span className="font-medium">Travel Time:</span>{" "}
                {data.spaceYears} years
              </li>
              <li>
                <span className="font-medium">Age Before Travel:</span>{" "}
                {data.actualAge} years
              </li>
              <li>
                <span className="font-medium">Direction:</span> {data.direction}
              </li>
              <li>
                <span className="font-medium">Destination:</span>{" "}
                {data.destination}
              </li>
            </ul>
          )}
        </div>

        {/* AI Review */}
        <div className="bg-white rounded-xl p-4 md:p-6 shadow overflow-y-auto">
          <article className="prose prose-slate max-w-none">
            <ReactMarkdown>{data.aiReview}</ReactMarkdown>
          </article>
        </div>
      </div>
    </div>
  );
}

export default Result;
