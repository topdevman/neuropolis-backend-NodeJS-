var nodemailer = require('nodemailer');
var smtpPool = require('nodemailer-smtp-pool');
var mailConfig = require('../config/main').smtp;

var transport = nodemailer.createTransport(smtpPool({
	host: mailConfig.host,
	port: mailConfig.port,
	tls: {
		rejectUnauthorized:false
	},
	auth: {
		user: mailConfig.user,
		pass: mailConfig.password
	},
	maxConnections: 3,
	maxMessages: 300
}));

exports.welcome = (user) => {
	var message = "";
	message += "Hi " + user.first_name;
	message += "\nCongratulations! Your account has been created successfully you can now log in";
	message += "\n- Username: " + user.username;
	message += "\n- Password: " + user.password;

	var mail_object = {
		from: mailConfig.sender,
		to: user.username,
		subject: "Welcome",
		text: message
	};

	transport.sendMail(mail_object, (error, info) => {
		if(error) {
			console.log(error.response);
		}
	});
};