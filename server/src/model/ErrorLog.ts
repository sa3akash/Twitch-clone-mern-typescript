import mongoose from "mongoose";

const errorLogSchema = new mongoose.Schema({
  data: Object,
});

export const ErrorLog = mongoose.model("ErrorLog", errorLogSchema);
