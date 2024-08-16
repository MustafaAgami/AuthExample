import mongoose from "mongoose";
import User from "../models/UserModel";

const connection = {};

async function connect() {
  if (connection.isConnected) {
    console.log("Already Connected to Database");
    return;
  }
  try {
    console.log("Mongodb url", process.env.MONGODB_URL);
    const db = await mongoose.connect("mongodb+srv://mustafadahodwala:mPVpimWA9P5U2cIz@chatbot-cluster.wroz0qv.mongodb.net/auth?retryWrites=true&w=majority&appName=chatbot-cluster" || "");
    connection.isConnected = db.connections[0].readyState;
    const users = new User({
      username: "aniket",
      email: "aniket@gmail.com",
      password: "$2a$10$LDuZiXtcd4uPIW6v/jFjYOhWgTtrUIe8Kf8tW5KJUvlhsHXOqxaue",
      isVerfied: true,
    });
    //users.save();
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error("Error connecting to MongoDB", err);
    process.exit(1);
  }
}
export default connect;
