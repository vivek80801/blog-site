import mongoose, { Document } from "mongoose";

const userSchema = new mongoose.Schema({
	userName: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
});

export interface IUser extends Document {
	userName: string;
	email: string;
	password: string;
}

const User = mongoose.model<IUser>("User", userSchema);

export default User;
