import { Strategy as JWTStrategy, ExtractJwt } from 'passport-jwt';
import User from '../models/users.mjs';

const options = {
	jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
	secretOrKey: process.env.SECRET_KEY,
};

export default (passport) => {
	passport.use(
		new JWTStrategy(options, async (payload, done) => {
			try {
				const user = await User.findById(payload.id);
				if (user) {
					return done(null, {
						id: user._id.toString('hex'),
						username: user.username,
						email: user.email,
						role: user.role,
						photo: user.profile_picture,
						is_verified: user.is_verified,
						join_date: user.createdAt,
					});
				}
			} catch (error) {
				console.error(error);
			}

			return done(null, false);
		}),
	);
};
