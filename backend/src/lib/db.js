import mongoose from "mongoose";

export const connetDB = async () => {
  try {
      const {MONGODB_URL} = process.env;
      if(!MONGODB_URL) throw new Error("MONGODB_URL is not set ");

    const conn = await mongoose.connect(process.env.MONGODB_URL);
    console.log("MoNGODB CONNECTED : ", conn.connection.host);
  } catch (error) {
    console.error("Error connection to MONGODB", error);
    process.exit(1); // 1 status code means fail, 0 means succes
  }
};
