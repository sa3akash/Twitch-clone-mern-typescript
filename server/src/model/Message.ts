import mongoose, { mongo } from "mongoose";

interface IMessage extends mongoose.Document {
  author: string;
  message: string;
}

const MessageSchema = new mongoose.Schema(
  {
    author: { type: mongoose.Types.ObjectId, ref: "User" },
    message: { type: String },
  },
  {
    timestamps: true,
  }
);

export const Message = mongoose.model<IMessage>("Message", MessageSchema, "Message");
