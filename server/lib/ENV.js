import dotenv from "dotenv";

dotenv.config();

export const ENV = {
  PORT: process.env.PORT,
  DB_URL: process.env.DB_URL,
  ACCRSS_SECRET: process.env.ACCRSS_SECRET,
  REFRESH_SECRET: process.env.REFRESH_SECRET,
};
