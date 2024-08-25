import mongoose, { Schema } from 'mongoose';

const collaborationSchema = new Schema(
	{
		post: { type: Schema.Types.ObjectId, ref: 'blog_posts' },
		user: { type: Schema.Types.ObjectId, ref: 'users' },
		is_accepted: { type: Boolean, default: false },
		is_active: { type: Boolean, default: true },
	},
	{ timestamps: true },
);

export default mongoose.model('collaborations', collaborationSchema);
