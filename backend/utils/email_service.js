require('dotenv').config();
const sgMail = require('@sendgrid/mail')
const sendEmail = async (email, token) => {
	console.log("here")
	const subject = 'Reset password';
	const resetPasswordUrl = `http://localhost:3000/reset-password/${token}`;
	const text = `Dear user, to reset your password, click on this link: ${resetPasswordUrl}
			If you did not request any password resets, then ignore this email.`;
	
	sgMail.setApiKey('');
	let msg = {
		to: '', // Change to your recipient
		from: '', // Change to your verified sender
		subject: subject,
		text: text,
		
	}
	sgMail
	.send(msg)
	.then(() => {
	console.log('Email sent')
	})
	.catch((error) => {
	console.error(error)
	})
};

module.exports = sendEmail;
