import mongoose from "mongoose";

let isConnected = false;

export const connectToDB = async () => {
  mongoose.set("strictQuery", true);

  if (!process.env.MONGODB_URL) return console.log("MONGODB_URL not found");
  if (isConnected) return console.log("Already connected to MongoDB");

  try {
    await mongoose.connect(process.env.MONGODB_URL, {
      serverSelectionTimeoutMS: 50000, // 5 seconds
      socketTimeoutMS: 45000,
    });

    isConnected = true;

    console.log("Connected to MongoDB!");
  } catch (err) {
    console.log("Error connecting to DB: ", err);
  }
};
