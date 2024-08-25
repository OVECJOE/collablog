import User from '../../models/users.mjs';
import validateLoginInput from '../../validators/auth/login.mjs';

export default async (req, res) => {
	const { errors, isValid } = validateLoginInput(req.body);
	if (!isValid) {
		return res.status(400).json(errors);
	}

	const { email, password } = req.body;
	try {
		const token = await User.login(email, password);
		return res.json({
			success: true,
			token: `Bearer ${token}`,
		});
	} catch (error) {
		return res.status(400).json({ error: error.message });
	}
};
