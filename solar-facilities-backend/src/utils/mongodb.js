import mongoose from "mongoose";

async function connect() {
  try {
    await mongoose.connect(process.env.DB_URI);
    console.log("Connected to DB");
  } catch (error) {
    console.error("Error connecting to mongodb");
    console.error(error);
  }
}

export { connect };
