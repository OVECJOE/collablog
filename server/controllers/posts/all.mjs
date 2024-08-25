import mongoose from 'mongoose';
import Post from '../../models/posts.mjs';

export default async (req, res) => {
	try {
		let { page, limit } = req.query;
		page = req.query.page ? Number.parseInt(page, 10) : undefined;
		limit = req.query.limit ? Number.parseInt(limit, 10) : undefined;

		const options = { sort: { createdAt: -1 }, populate: ['creator', 'collaborators'] };
		if (page && limit) {
			options.limit = limit;
			options.skip = (page - 1) * limit;
		}

		const query = {};
		if (req.query?.coauthored) {
			if (req.query?.ownership === 'creator') {
				query.creator = req.user.id;
			} else if (req.query?.ownership === 'collaborator') {
				query.$in = { collaborators: req.user.id };
			} else {
				const userId = new mongoose.Types.ObjectId(req.user.id);
				query.$or = [{ creator: userId }, { collaborators: userId }];
			}
		} else {
			query.is_published = true;
		}

		const posts = await Post.find(query, null, options);
		return res.json(posts);
	} catch (error) {
		console.log(error.message);
		return res.status(500).json({ message: 'An error occurred while fetching posts' });
	}
};
