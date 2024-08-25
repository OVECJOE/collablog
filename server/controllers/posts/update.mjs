import { marked } from 'marked';
import Post from '../../models/posts.mjs';
import isEmpty from '../../validators/common/is-empty.mjs';

export default async (req, res) => {
	const { id } = req.params;
	const { title, content } = req.body;

	try {
		const post = await Post.findById({
			_id: id,
			$or: [{ creator: req.user.id }, { collaborators: req.user.id }],
		});

		if (!post) {
			return res.status(404).json({ message: 'Post not found' });
		}

		if (!isEmpty(title)) {
			post.title = title;
		}

		if (!isEmpty(content)) {
			post.content = content;
			post._html = marked.parse(content);
		}

		await post.save();
		return res.json(post);
	} catch (error) {
		return res.status(500).json({ message: 'An error occurred while updating the post' });
	}
};
