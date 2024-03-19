import Handlebars from 'handlebars';
import * as nodemailer from 'nodemailer';
import { activationTemplate } from './emailTemplates/activation';
import { resetPasswordTemplate } from './emailTemplates/resetPassword';

export async function sendMail({ to, subject, body }: { to: string; subject: string; body: string }) {
  const { SMPT_EMAIL, SMTP_GMAIL_PASS, SMTP_USER, SMTP_PASS } = process.env;

  var transport = nodemailer.createTransport({
    host: 'sandbox.smtp.mailtrap.io',
    port: 2525,
    auth: {
      user: SMTP_USER,
      pass: SMTP_PASS,
    },
  });
  try {
    const testRes = transport.verify();
    console.log('TEST RESULT OF TRANSPORT', testRes);
  } catch (error) {
    console.log(error);
  }

  try {
    const sendResult = await transport.sendMail({
      from: SMPT_EMAIL,
      to,
      subject,
      html: body,
    });
    console.log({ sendResult });
  } catch (error) {
    console.log(error);
  }
}

export function compileActivationTemplate(name: string, url: string) {
  const template = Handlebars.compile(activationTemplate);

  const htmlBody = template({
    name,
    url,
  });

  return htmlBody;
}

export function compileResetPasswordTemplate(name: string, url: string) {
  const template = Handlebars.compile(resetPasswordTemplate);

  const htmlBody = template({
    name,
    url,
  });

  return htmlBody;
}
