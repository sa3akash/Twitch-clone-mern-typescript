import mongoose from "mongoose";
import bcryptjs from "bcryptjs";

interface IUserSchema extends mongoose.Document {
  name: string;
  email: string;
  password: string;
  comparePassword(password: string): Promise<boolean>;
  hashPassword(password: string): Promise<string>;
}

const UserSchema = new mongoose.Schema(
  {
    name: { type: String },
    email: { type: String, unique: true, lowercase:true },
    password: { type: String },
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
