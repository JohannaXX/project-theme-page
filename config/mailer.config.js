const nodemailer = require('nodemailer');

const host = process.env.HOST || 'http://localhost:3000';
const user = process.env.NM_USER;

const transport = nodemailer.createTransport(
	{
		service: 'Gmail',
		auth: {
			user: user,
			pass: process.env.NM_PASS
		}
	}
)

module.exports.sendValidationEmail = (email, activationToken, name) => {
	transport.sendMail({
		to: email,
		from: `Springfield University <${user}>`,
		subject: 'Please activate your account here',
		html: `
			<h1>Hi ${name},</h1>
			<p>Please click on the button below to activate your account.</p>
			<a href="${host}/activate/${activationToken}" style="margin: 20px; padding: 15px; color: white; background-color: black; border-radius: 5px;">Click here</a>
		`
	})
}
