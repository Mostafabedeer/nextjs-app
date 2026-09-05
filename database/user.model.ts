import { model, models, Schema } from "mongoose";

interface IUser {
  name: string;
  username: string;
  email: string;
  password: string;
  bio?: string;
  image: string;
  location?: string;
  portfolio?: string;
  reputation?: number;
  joinedAt: Date;
}

const UserSchema = new Schema<IUser>({
  name: { type: String, required: true },
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  bio: { type: String, default: "" },
  image: { type: String, required: true },
  location: { type: String, default: "" },
  portfolio: { type: String, default: "" },
  reputation: { type: Number, default: 0 },
  joinedAt: { type: Date, default: Date.now },
});

const User = models?.User || model<IUser>("User", UserSchema);

export default User;
