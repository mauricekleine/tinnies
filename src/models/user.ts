import {
  ApolloError,
  AuthenticationError,
  UserInputError,
} from "apollo-server-micro";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Document, Model, Schema, model, models } from "mongoose";
import isEmail from "validator/lib/isEmail";

import { User } from "../types/graphql";
import { sanitizeString } from "../utils/sanitizers";

export type UserDocument = User & { password: string } & Document;

export const userSchema = new Schema(
  {
    email: { required: true, type: String },
    name: { required: true, type: String },
    password: { required: true, select: false, type: String },
  },
  {
    timestamps: true,
  }
);

const UserModel: Model<UserDocument> = models.User || model("User", userSchema);

export const generateUserModel = ({ user }: { user: User }) => ({
  deleteCurrentUser: async () => {
    if (!user) {
      return null;
    }

    await UserModel.findByIdAndDelete(user.id);

    return user.id;
  },

  getCurrentUser: async () => {
    if (!user) {
      return null;
    }

    return await UserModel.findById(user.id);
  },

  login: async (email: User["email"], password: string) => {
    if (!email || !isEmail(email) || !password) {
      throw new UserInputError("Invalid email and/or password");
    }

    try {
      const user = await UserModel.findOne({ email }, "+password");

      if (!(user && (await bcrypt.compare(password, user.password)))) {
        throw new AuthenticationError("Invalid email and/or password");
      }

      const token = jwt.sign(
        {
          id: user._id,
        },
        process.env.JWT_SECRET
      );

      return { token, user };
    } catch (err) {
      throw new ApolloError(err);
    }
  },

  signup: async (
    email: User["email"],
    dirtyName: User["name"],
    password: string
  ) => {
    const name = sanitizeString(dirtyName);

    if (!email || !isEmail(email)) {
      return null;
    }

    if (!password || password.length <= 8) {
      return null;
    }

    if (!name) {
      return null;
    }

    const results = await UserModel.countDocuments({ email });

    if (results > 0) {
      return null;
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await UserModel.create({
      email,
      name,
      password: hashedPassword,
    });

    const token = jwt.sign(
      {
        id: user._id,
      },
      process.env.JWT_SECRET
    );

    return { token };
  },
});

export default UserModel;
