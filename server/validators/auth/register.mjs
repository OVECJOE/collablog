import validator from 'validator';
import isEmpty from '../common/is-empty.mjs';

export default function validateRegisterInput(data) {
	const errors = {};
	const { username, email, password, photo } = data;

	if (isEmpty(username)) {
		errors.username = 'Username field is required';
	} else if (!validator.isLength(username, { min: 4, max: 16 })) {
		errors.username = 'Username must be between 4 and 16 characters';
	}

	if (isEmpty(email)) {
		errors.email = 'Email field is required';
	} else if (!validator.isEmail(email)) {
		errors.email = 'Email is invalid; please enter a valid email address';
	}

	if (isEmpty(password)) {
		errors.password = 'Password field is required';
	} else if (!validator.isLength(password, { min: 8 })) {
		errors.password = 'Password must be at least 8 characters';
	}

	if (!isEmpty(photo) && !validator.isURL(photo)) {
		errors.photo = 'Photo must be a valid URL';
	}

	return {
		errors,
		isValid: isEmpty(errors),
	};
}
