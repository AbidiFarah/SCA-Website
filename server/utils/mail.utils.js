const nodemailer = require ('nodemailer')
const {google} = require('googleapis')
const {OAuth2}= google.auth
const OAUTH_PLAYGROUND = 'https://developers.google.com/oauthplayground'



const {
  MAILING_SERVICE_CLIENT_ID ,
  MAILING_SERVICE_SECRET_CLIENT ,
  MAILING_SERVICE_REFRECH_TOKEN ,
  SENDER_EMAIL_ADDRESS
} = process.env

const oauth2Client = new OAuth2(
  MAILING_SERVICE_CLIENT_ID ,
  MAILING_SERVICE_SECRET_CLIENT ,
  MAILING_SERVICE_REFRECH_TOKEN ,
  OAUTH_PLAYGROUND
)

//send mail
module.exports.sendMail = (to , url, txt) => {
  oauth2Client.setCredentials({
    refresh_token: MAILING_SERVICE_REFRECH_TOKEN
  })

  const accessToken =oauth2Client.getAccessToken()
  const smtpTransport = nodemailer.createTransport({
      service: 'gmail' ,
      auth: {
        type: 'OAuth2',
        user: SENDER_EMAIL_ADDRESS,
        clientId: MAILING_SERVICE_CLIENT_ID ,
        clientSecret: MAILING_SERVICE_SECRET_CLIENT ,
        refreshToken: MAILING_SERVICE_REFRECH_TOKEN ,
        accessToken
      }
  })


  const mailOption = {
     from: SENDER_EMAIL_ADDRESS ,
     to : to ,
     subject: "Verification Mail",
     html: `
      <div style="max-width: 700px; margin:auto; border: 10px solid #ddd; padding: 50px 20px; font-size: 110%;">
      <h2 style="text-align: center; text-transform: uppercase;color: teal;">Welcome to the DevAT channel.</h2>
      <p>Congratulations! You're almost set to start using SheCodesAfrica.
         Just click the button below to validate your email address.
      </p>
     
      <a href=${url} style="background: crimson; text-decoration: none; color: white; padding: 10px 20px; margin: 10px 0; display: inline-block;">${txt}</a>
 
      <p>If the button doesn't work for any reason, you can also click on the link below:</p>
 
      <div>${url}</div>
      </div>
        `
  }

  smtpTransport.sendMail(mailOption, (err, infor) => {
    if(err) return err
    return infor
   })
}









exports.generteOTP =() => {
    let OTP = ''
   for(let i = 0; i <=3; i++){
    return (OTP + Math.round(Math.random() * 7))
   }
 }

exports.mailTransport = () => {
   const  transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: process.env.MAILTRAP_USERNAME ,
      pass: process.env.MAILTRAP_PASSWORD
    }
  })
}
