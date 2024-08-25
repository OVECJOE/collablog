import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const userSchema = new Schema(
	{
		username: {
			type: String,
			required: true,
			unique: true,
			trim: true,
			lowercase: true,
			pattern: /^[a-z][a-z0-9_]{3,15}$/,
		},
		email: {
			type: String,
			required: true,
			unique: true,
			trim: true,
			lowercase: true,
			pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/,
		},
		password: {
			type: String,
			required: true,
			minlength: 8,
			select: false,
			pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
		},
		bio: {
			type: String,
			trim: true,
			maxlength: 512,
		},
		profile_picture: { type: String, trim: true, maxlength: 512 },
		is_verified: { type: Boolean, default: false },
		is_active: { type: Boolean, default: true },
		role: { type: String, enum: ['user', 'admin'], default: 'user' },
		collaborations: [{ type: Schema.Types.ObjectId, ref: 'collaborations' }],
		blog_posts: [{ type: Schema.Types.ObjectId, ref: 'blog_posts' }],
	},
	{ timestamps: true },
);

// Add a method for logging in a user
userSchema.statics.login = async function login(email, password) {
	const user = await this.findOne({ email }).select('+password');
	if (!user) {
		throw Error('Incorrect email');
	}
	const auth = await bcrypt.compare(password, user.password);
	if (!auth) {
		throw Error('Incorrect password');
	}

	return jwt.sign({ id: user._id }, process.env.SECRET_KEY, {
		expiresIn: '1h',
	});
};

export default mongoose.model('users', userSchema);
