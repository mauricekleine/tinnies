import mongoose from "mongoose";

export type User = {
  _id: string;
  email: string;
  name: string;
};

export type UserDocument = User & { password: string } & mongoose.Document;

export const userSchema = new mongoose.Schema(
  {
    email: { required: true, type: String },
    name: { required: true, type: String },
    password: { required: true, select: false, type: String },
  },
  {
    timestamps: true,
  }
);

const UserModel: mongoose.Model<UserDocument> =
  mongoose.models.User || mongoose.model("User", userSchema);

export default UserModel;
