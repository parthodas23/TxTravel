import jwt from "jsonwebtoken";
import { ENV } from "../lib/ENV.js";

const verifyToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401);

    const token = authHeader.split(" ")[1];
    if (!token) return res.status(401);

    jwt.verify(token, ENV.ACCESS_SECRET, (err, decoded) => {
      if (err) return res.sendStatus(401);

      req.userId = decoded.id;
      next();
    });
  } catch (error) {
    return res.status(501).json(err);
  }
};

export default verifyToken;
