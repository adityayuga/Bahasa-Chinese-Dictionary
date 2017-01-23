
const nodemailer = require("nodemailer")
const Config = require('../../config/config')
const crypto = require('crypto')
const algorithm = 'aes-256-ctr'

const privateKey = Config.key.privateKey;

// create reusable transport method (opens pool of SMTP connections)
const smtpTransport = nodemailer.createTransport("SMTP", {
    service: "Gmail",
    auth: {
        user: Config.email.username,
        pass: Config.email.password
    }
})

exports.sentMailForgotPassword = function(user) {
    var from = Config.email.accountName+" Team<" + Config.email.username + ">"
    var mailbody = "<p>Your "+Config.email.accountName+"  Account Credential</p><p>username : "+user.username+" , password : "+decrypt(user.password)+"</p>"
    mail(from, user.email , "Account password", mailbody);
}

exports.decrypt = function(password) {
    return decrypt(password)
}

exports.encrypt = function(password) {
    return encrypt(password)
}

function mail(from, email, subject, mailbody){
    var mailOptions = {
        from: from, // sender address
        to: email, // list of receivers
        subject: subject, // Subject line
        //text: result.price, // plaintext body
        html: mailbody  // html body
    };

    smtpTransport.sendMail(mailOptions, function(err, response) {
        if (err) {
            console.error(err)
        }
        smtpTransport.close() // shut down the connection pool, no more messages
    })
}

// method to decrypt data(password)
function decrypt(password) {
    var decipher = crypto.createDecipher(algorithm, privateKey);
    var dec = decipher.update(password, 'hex', 'utf8');
    dec += decipher.final('utf8');
    return dec;
}

// method to encrypt data(password)
function encrypt(password) {
    var cipher = crypto.createCipher(algorithm, privateKey);
    var crypted = cipher.update(password, 'utf8', 'hex');
    crypted += cipher.final('hex');
    return crypted;
}
