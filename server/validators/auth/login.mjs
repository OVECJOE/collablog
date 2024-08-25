import validator from 'validator';
import isEmpty from '../common/is-empty.mjs';

export default function validateLoginInput(data) {
	const errors = {};
	const { email, password } = data;

	if (isEmpty(email)) {
		errors.email = 'Email field is required';
	} else if (!validator.isEmail(email)) {
		errors.email = 'Email is invalid';
	}

	if (isEmpty(password)) {
		errors.password = 'Password field is required';
	} else if (!validator.isLength(password, { min: 8 })) {
		errors.password = 'Password must be at least 8 characters';
	}

	return {
		errors,
		isValid: isEmpty(errors),
	};
}
