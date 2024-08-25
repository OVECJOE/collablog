import nodemailer from 'nodemailer';
import pug from 'pug';
import juice from 'juice';
import { htmlToText } from 'html-to-text';

const transport = nodemailer.createTransport({
	host: process.env.MAIL_HOST,
	port: process.env.MAIL_PORT,
	auth: {
		user: process.env.MAIL_USER,
		pass: process.env.MAIL_PASS,
	},
});

const generateHTML = (filename, options = {}) => {
	const html = pug.renderFile(`${import.meta.dirname}/../views/emails/${filename}.pug`, options);
	return juice(html);
};

export default async (options) => {
	const html = generateHTML(options.filename, options.data);
	const text = htmlToText(html);

	const mailOptions = {
		from: process.env.MAIL_FROM,
		to: options.user.email,
		subject: options.subject,
		html,
		text,
	};

	return transport.sendMail(mailOptions);
};
