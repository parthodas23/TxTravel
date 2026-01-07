import React from "react";
import { useParams } from "react-router-dom";
function Result() {
  const userId = useParams();
  return <div>{userId}</div>;
}

export default Result;
