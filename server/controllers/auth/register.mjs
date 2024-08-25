import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import sendMail from '../../config/email.mjs';
import User from '../../models/users.mjs';
import validateRegisterInput from '../../validators/auth/register.mjs';

export default async (req, res) => {
	const { errors, isValid } = validateRegisterInput(req.body);
	if (!isValid) {
		return res.status(400).json(errors);
	}

	const { email, username, password, photo } = req.body;
	try {
		const exists = await User.exists({ email });
		if (exists) {
			return res.status(400).json({ email: 'Email already exists' });
		}

		const hash = await bcrypt.hash(password, await bcrypt.genSalt(10));
		const user = await User.create({ email, username, password: hash, photo });

		// send verification email
		const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, { expiresIn: '1d' });
		sendMail({
			user: { email },
			subject: 'Verify your account',
			filename: 'email-verification',
			data: {
				verificationLink: `${process.env.CLIENT_URL}/auth/verify?token=${token}`,
				username: user.username,
			},
		});

		return res.status(201).json({
			success: true,
			message: 'You have successfully registered. Please check your email to verify your account',
		});
	} catch (error) {
		return res.status(400).json({ error: error.message });
	}
};
