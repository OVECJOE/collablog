import jwt from 'jsonwebtoken';
import User from '../../models/users.mjs';

export default async (req, res) => {
	try {
		const { token } = req.body;
		if (!token) {
			return res.status(401).json({ message: 'No token provided' });
		}

		let decoded;
		try {
			decoded = jwt.verify(token, process.env.SECRET_KEY);
		} catch (err) {
			return res.status(401).json({ message: 'Invalid or expired token' });
		}

		const user = await User.findById(decoded.id);
		if (!user) {
			return res.status(404).json({ message: 'Account not found' });
		}

		if (user.is_verified) {
			return res.status(400).json({ message: 'Account already verified' });
		}

		user.is_verified = true;
		await user.save();

		return res.json({ message: 'Account verified successfully' });
	} catch (error) {
		return res.status(500).json({ message: 'An error occurred during verification' });
	}
};
