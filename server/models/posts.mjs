import mongoose, { Schema } from 'mongoose';

const postSchema = new Schema(
	{
		title: {
			type: String,
			required: true,
			trim: true,
			maxlength: 256,
		},
		content: {
			type: String,
			required: true,
			trim: true,
			maxlength: 10000,
		},
		creator: { type: Schema.Types.ObjectId, ref: 'users' },
		_html: {
			type: String,
			required: true,
		},
		collaborators: [{ type: Schema.Types.ObjectId, ref: 'users' }],
		tags: [{ type: String, trim: true, lowercase: true, unique: true }],
		is_published: { type: Boolean, default: false },
		is_deleted: { type: Boolean, default: false },
	},
	{ timestamps: true },
);

export default mongoose.model('blog_posts', postSchema);
