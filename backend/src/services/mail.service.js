import transporter from "../config/mail.js";

import verificationEmailTemplate from "../templates/auth/verificationEmail.template.js";

import welcomeEmailTemplate from "../templates/auth/welcomeEmail.template.js";

import { MAIL_SUBJECTS } from "../constants/index.js";

class MailService {
  /**
   * Generic Mail Sender
   */
  async sendMail({ to, subject, html }) {
    const info = await transporter.sendMail({
      from: process.env.MAIL_FROM,
      to,
      subject,
      html,
    });

    console.log("📧 Mail Sent:", info);

    return info;
  }

  /**
   * Verification Email
   */
  async sendVerificationEmail({ to, data }) {
    const html = verificationEmailTemplate(data);

    return await this.sendMail({
      to,
      subject: MAIL_SUBJECTS.VERIFY_EMAIL,
      html,
    });
  }

  async sendWelcomeEmail({ to, data }) {
    const html = welcomeEmailTemplate(data);

    return await this.sendMail({
      to,
      subject: MAIL_SUBJECTS.WELCOME,
      html,
    });
  }
}

export default new MailService();
