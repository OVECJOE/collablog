import { marked } from 'marked';
import validateCreatePostInput from '../../validators/posts/create.mjs';
import Post from '../../models/posts.mjs';
import User from '../../models/users.mjs';

export default async (req, res) => {
	const { errors, isValid } = validateCreatePostInput(req.body);
	if (!isValid) {
		return res.status(400).json(errors);
	}

	const { title, content, collaborators } = req.body;
	try {
		// convert the markdown content to HTML
		const _html = await marked.parse(content);

		// verify that the collaborators exist
		const exist = await User.exists({ _id: { $in: collaborators } });
		if (!exist) {
			return res.status(404).json({ collaborators: 'One or more collaborators do not exist' });
		}

		const post = await Post.create({ title, content, _html, creator: req.user.id, collaborators });

		return res.status(201).json(post);
	} catch (error) {
		return res.status(400).json({ error: error.message });
	}
};
