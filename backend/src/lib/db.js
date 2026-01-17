import mongoose from "mongoose";
import { ENV } from "./env.js";
export const connetDB = async () => {
  try {
      const { MONGODB_URL } = ENV;
      if(!MONGODB_URL) throw new Error("MONGODB_URL is not set ");

    const conn = await mongoose.connect(ENV.MONGODB_URL);
    console.log("MoNGODB CONNECTED : ", conn.connection.host);
  } catch (error) {
    console.error("Error connection to MONGODB", error);
    process.exit(1); // 1 status code means fail, 0 means succes
  }
};
