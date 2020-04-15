var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'yourmail@gmail.com',
        pass: 'yourpassword'
    }
});

var mailOptions = {
    from: 'noreplay.sports-data-analytica@gmail.com',
    replyTo: 'noreply.sports-data-analytica@gmail.com',
    to: 'myfriend@yahoo.com',
    subject: 'subscription to sports data analytica api',
    text: '',
    html: ''
};

module.exports = {
    transporter: transporter,
    mailOptions: mailOptions
};