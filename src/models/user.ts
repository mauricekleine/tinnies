import mongoose from "mongoose";

export type UserDocument = {
  email: string;
  name: string,
  password: string;
} & mongoose.Document;

export const UserSchema = new mongoose.Schema(
  {
    email: { required: true, type: String },
    name: { required: true, type: String },
    password: { required: true, type: String },
  },
  {
    timestamps: true,
  }
);

const User: mongoose.Model<UserDocument> =
  mongoose.models.User || mongoose.model("User", UserSchema);

export default User;
