import mongoose from "mongoose";
import { config } from "@/config";

const log = config.createLogger("database connect");

export default () => {
  const connectDB = () => {
    mongoose.connect(config.MONGO_URI!);

    const db = mongoose.connection;
    db.on("error", log.error.bind(console, "MongoDB connection error:"));
    db.once("open", function () {
      log.info("Connected to MongoDB");
    });
  };

  connectDB();
  mongoose.connection.on("disconnected", connectDB);
  mongoose.connection.on("error", connectDB);
};
