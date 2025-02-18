// Service to send email about their bounty .

import nodemailer from "nodemailer"

const transporter = nodemailer.createTransport({
  service: "gmail",
  port: 465,
  secure: true,
  auth:{
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
})

export async function sendEmail (to: string, body: string) {
  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to,
    subject: "Hello from TaskForge",  
    text: body
  })
}

