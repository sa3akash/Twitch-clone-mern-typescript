import mongoose, { mongo } from "mongoose";
import { v4 as uuid } from "uuid";

interface IChannelSchema extends mongoose.Document {
    userId: string;
  isActive: boolean;
  title: string;
  desc: string;
  avaterUrl: string;
  streamKey: string;
  messages: [];
}

const ChannelSchema = new mongoose.Schema(
  {
    // userId: { type: mongoose.Types.ObjectId, ref: "User" },
    isActive: { type: Boolean, default: false },
    title: { type: String, default: "New Channel"},
    desc: { type: String , default: "This is a default desc"},
    avaterUrl: { type: String,default: "" },
    streamKey: { type: String, default: uuid() },
    messages: {
      type: [{ type: mongoose.Types.ObjectId, ref: "Message" }],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

export const Channel = mongoose.model<IChannelSchema>(
  "Channel",
  ChannelSchema,
  "Channel"
);
