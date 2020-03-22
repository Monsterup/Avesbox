const nodemailer = require('nodemailer');
const responseMsg = require('../helpers/responseMessage');

exports.forgetPassword = async (email, token) => {
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        auth: {
            user: "yudhamanage@gmail.com",
            pass: "Pemalang123"
        }
    });

    let info = await transporter.sendMail({
        from: `"${process.env.NAME_SENDER} 🐔" <${process.env.MAIL_SENDER}>`,
        to: `"${email}"`,
        subject: "Avesbox: Forget Password",
        text: `Forget Password`,
        html: `${responseMsg.sendResetPassword('https://avesbox.herokuapp.com/password-reset' , token)}`
    });

    return info;
}

exports.verifyEmail = async (email, token) => {
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        auth: {
            user: "yudhamanage@gmail.com",
            pass: "Pemalang123"
        }
    });

    let info = await transporter.sendMail({
        from: `"${process.env.NAME_SENDER} 🐔" <${process.env.MAIL_SENDER}>`,
        to: `"${email}"`,
        subject: "Avesbox: Verify Email",
        text: `Verify Your Email`,
        html: `${responseMsg.sendVerifyEmail('https://avesbox.herokuapp.com/verify-email' , token)}`
    });

    return info;
}
