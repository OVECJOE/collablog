import Post from '../../models/posts.mjs';
import isEmpty from '../../validators/common/is-empty.mjs';

export default async (req, res) => {
	const { id } = req.params;
	if (isEmpty(id)) {
		return res.status(400).json({ message: 'Post ID is required' });
	}

	try {
		const post = await Post.findOneAndDelete({ _id: id, creator: req.user.id });
		if (!post) {
			return res.status(404).json({ message: 'Post not found' });
		}

		return res.json({ message: 'Post deleted successfully' });
	} catch (error) {
		return res.status(500).json({ message: 'An error occurred while deleting the post' });
	}
};
