import validator from 'validator';
import isEmpty from '../common/is-empty.mjs';

export default (data) => {
	const errors = {};
	const { title, content, collaborators } = data;

	if (!validator.isLength(title, { min: 1, max: 256 })) {
		errors.title = 'Title must be between 1 and 256 characters';
	}

	if (isEmpty(title)) {
		errors.title = 'Title is required';
	}

	if (!validator.isLength(content, { min: 100, max: 10000 })) {
		errors.content = 'Body must be between 100 and 10000 characters';
	}

	if (isEmpty(content)) {
		errors.content = 'Body is required';
	}

	if (isEmpty(collaborators)) {
		errors.collaborators = "You can't create a post single-handedly; add at least one partner.";
	}

	if (collaborators.length > 5) {
		errors.collaborators = "You can't add more than 5 collaborators to a post.";
	}

	return {
		errors,
		isValid: isEmpty(errors),
	};
};
