import validateSearchQuery from '../../validators/auth/current.mjs';
import User from '../../models/users.mjs';

export default async (req, res) => {
	const { errors, isValid } = validateSearchQuery(req.query);
	if (!isValid) {
		return res.status(400).json(errors);
	}

	const user = { ...req.user };
	const { include, exclude } = req.query;

	if (exclude) {
		const fields = exclude.split(',');
		// eslint-disable-next-line no-restricted-syntax
		for (const field of fields) {
			if (!(field in user)) {
				return res.status(400).json({ exclude: `Field '${field}' does not exist` });
			}

			delete user[field];
		}
	}

	if (include) {
		const fields = include.split(',');
		const moreInfo = await User.findById(user.id).select(fields.join(' '));
		if (!moreInfo) {
			return res.status(400).json({ include: 'One or more fields do not exist' });
		}

		// eslint-disable-next-line no-restricted-syntax, guard-for-in
		for (const field of fields) {
			user[field] = moreInfo[field];
		}
	}

	return res.json(user);
};

export const getUsers = async (req, res) => {
	try {
		const { page } = req.query;

		let query = User.find().select('id name email').limit(1000);
		if (page) {
			query = query.skip((page - 1) * 1000);
		}

		const users = await query;
		return res.json(users);
	} catch (error) {
		return res.status(500).json({ message: 'An error occurred while fetching users' });
	}
};
