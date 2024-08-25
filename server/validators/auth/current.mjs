import isEmpty from '../common/is-empty.mjs';

export default (data) => {
	const errors = {};
	const { include, exclude } = data;

	if (!isEmpty(include) && typeof include !== 'string') {
		errors.include = "'include' must be a string";
	}

	if (!isEmpty(exclude) && typeof exclude !== 'string') {
		errors.exclude = "'exclude' must be a string";
	}

	// include and exclude are comma-separated strings of user fields to include or exclude
	// from the response and they must not contain any common fields
	if (
		!isEmpty(include) &&
		!isEmpty(exclude) &&
		exclude.split(',').some((field) => include.split(',').includes(field))
	) {
		errors.exclude = "'include' and 'exclude' must not contain any common fields";
	}

	return {
		errors,
		isValid: isEmpty(errors),
	};
};
