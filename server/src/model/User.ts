import mongoose from "mongoose";
import bcryptjs from "bcryptjs";

interface IUserSchema extends mongoose.Document {
  name: string;
  email: string;
  password: string;
  comparePassword(password: string): boolean;
  hashPassword(password: string): string;
  channel: mongoose.Types.ObjectId;
  followedChannel:[mongoose.Types.ObjectId];
}

const UserSchema = new mongoose.Schema(
  {
    name: { type: String },
    email: { type: String, unique: true, lowercase: true },
    password: { type: String },
    channel: { type: mongoose.Types.ObjectId, ref: "Channel" },
    followedChannel: {
      type: [{ type: mongoose.Types.ObjectId, ref: "Channel" }],
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform(_doc, userData) {
        delete userData.password;
        return userData;
      },
    },
  }
);

UserSchema.pre("save", function (this, next) {
  this.password = bcryptjs.hashSync(this.password!, 15);
  next();
});

UserSchema.methods.comparePassword = function (password: string) {
  const hashPassword = (this as unknown as IUserSchema).password;
  return bcryptjs.compareSync(password, hashPassword);
};

UserSchema.methods.hashPassword = function (password: string) {
  return bcryptjs.hashSync(password, 15);
};

export const User = mongoose.model<IUserSchema>("User", UserSchema, "User");
