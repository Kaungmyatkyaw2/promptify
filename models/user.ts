import { Document, Schema, model, models } from "mongoose";

export interface UserType extends Document{
  email: string;
  username: string;
  image: string;
}

const UserSchema = new Schema<UserType>({
  email: {
    type: String,
    unique: true,
    required: [true, "Email is required!"],
  },
  username: {
    type: String,
    required: [true, "Username is required!"],
  },
  image: {
    type: String,
  },
});

const User = models.User || model("User", UserSchema);

export default User;
