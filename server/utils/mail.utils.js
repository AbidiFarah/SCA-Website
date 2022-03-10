const nodemailer = require ('nodemailer')

exports.generteVT =() => {
    let VT = ''
   for(let i = 0; i <=3; i++){
    return (VT + Math.round(Math.random() * 7))
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