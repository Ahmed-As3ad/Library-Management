import mongoose from "mongoose";

const connection = async () => {
  try {
    mongoose.connect(process.env.DB_URI, {});
    console.log(`Connected to DB ✔️`);
  } catch (error) {
    console.log(`fail connect to DB ❌`, error);
  }
};

export default connection;
