import transporter from "../config/mail.js";

import verificationEmailTemplate from "../templates/auth/verificationEmail.template.js";

import welcomeEmailTemplate from "../templates/auth/welcomeEmail.template.js";

import { MAIL_SUBJECTS } from "../constants/index.js";
import resetPasswordTemplate from "../templates/auth/resetPassword.template.js";

import restaurantSubmittedTemplate from "../templates/restaurant/restaurantSubmitted.template.js";

import restaurantApprovedTemplate from "../templates/restaurant/restaurantApproved.template.js";

import restaurantRejectedTemplate from "../templates/restaurant/restaurantRejected.template.js";

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

  /**
   * Reset Password Email
   */
  async sendResetPasswordEmail({ to, data }) {
    const html = resetPasswordTemplate(data);

    return await this.sendMail({
      to,
      subject: MAIL_SUBJECTS.RESET_PASSWORD,
      html,
    });
  }

  /**
   * Restaurant Registration Submitted
   */
  async sendRestaurantCreatedEmail({ to, data }) {
    const html = restaurantSubmittedTemplate(data);

    return this.sendMail({
      to,
      subject: MAIL_SUBJECTS.RESTAURANT_CREATED,
      html,
    });
  }

  /**
   * Restaurant Approved
   */
  async sendRestaurantApprovedEmail({ to, data }) {
    const html = restaurantApprovedTemplate(data);
    console.log(data);

    return this.sendMail({
      to,
      subject: MAIL_SUBJECTS.RESTAURANT_APPROVED,
      html,
    });
  }

  /**
   * Restaurant Rejected
   */
  async sendRestaurantRejectedEmail({ to, data }) {
    const html = restaurantRejectedTemplate(data);

    return this.sendMail({
      to,
      subject: MAIL_SUBJECTS.RESTAURANT_REJECTED,
      html,
    });
  }
}

export default new MailService();
