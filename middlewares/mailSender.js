transporter = require('../config/mailer.config').transporter;

function mailSend(mailOptions) {
    transporter.sendMail(mailOptions, function(error, info){
        if(error){
            return console.log(error);
        }
        console.log('Message sent: ' + info.response);
    });

    transporter.close();
}

function htmlWelcomeMessage(token, user){
    let html = '<!DOCTYPE html>'+
        '<html><head><title>Subscription to sports data analytica api</title>'+
        '</head><body><div>'+
        '<h2>welcome '+ user.nom + '</h2>'+
        '<p>Thank you for your subscription.</p>'+
        '<p>Here is your token to use for each request through our api:</p>'+
        '<p>it must be committed through the header authorization field : Bearer Token </p>'+
        '<p>'+token+'</p>'+
        '</div></body></html>';

    return html;

}
module.exports = {
    sender: mailSend,
    htmlWelcomeMessage: htmlWelcomeMessage
};