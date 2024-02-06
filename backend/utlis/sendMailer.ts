import * as nodemailer from "nodemailer";

interface EmailOptions {
  email: string;
  subject: string;
  message: string;
}

const sendEmail = async (options: EmailOptions) => {
    const transport = nodemailer.createTransport({
      // @ts-ignore
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const message = {
    from: `${process.env.EMAIL_FROM_NAME} <${process.env.EMAIL_FROM_EMAIL}>`,
    to: options.email,
    subject: options.subject,
    html: options.message,
  }

  await transport.sendMail(message);
};

export default sendEmail;
