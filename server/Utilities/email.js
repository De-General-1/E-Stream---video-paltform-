import nodemailer from 'nodemailer'
import { createError } from '../error.js'

export const sendEmail = async (option) => {
    // CREATE A TRANSPORTER
    const transporter = nodemailer.createTransport({
        service: "gmail",
        host: process.env.GMAIL_HOST,
        port: process.env.GMAIL_PORT,
        secure: false,
        auth: {
            user: process.env.GMAIL_USER,
            pass: process.env.GMAIL_PASSWORD
        }
    })

    console.log(option.email, "line 16")

    //DEFINE EMAIL OPTIONS
    const emailOptions = {
        from: {
            name: "DeGeneral support<support@degeneral.com>",
            address: process.env.GMAIL_USER,
        },
        to: option.email,
        subject: option.subject,
        text:option.message
    }

    const sendMail = async (transporter, emailOptions) => {
        try{
            await transporter.sendMail(emailOptions);
            console.log("Email has been sent successfully")
        }catch(err){
            createError(500, "Couldn't send email")
        }
    }
    
    sendMail(transporter, emailOptions)
}