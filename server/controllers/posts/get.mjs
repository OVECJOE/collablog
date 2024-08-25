import mongoose from 'mongoose';
import Post from '../../models/posts.mjs';
import isEmpty from '../../validators/common/is-empty.mjs';

export default async (req, res) => {
	try {
		const { id } = req.params;

		if (isEmpty(id)) {
			return res.status(400).json({ message: 'Post ID is required' });
		}

		const query = { _id: id };
		if (req.query?.coauthored) {
			const userId = mongoose.Types.ObjectId(req.user.id);
			query.$or = [{ creator: userId }, { collaborators: userId }];
		} else {
			query.is_published = true;
		}

		const post = await Post.findOne(query).populate('creator', 'name email').populate('collaborators', 'name email');
		if (!post) {
			return res.status(404).json({ message: 'Post not found' });
		}

		return res.json(post);
	} catch (error) {
		return res.status(500).json({ message: 'An error occurred while fetching the post' });
	}
};
