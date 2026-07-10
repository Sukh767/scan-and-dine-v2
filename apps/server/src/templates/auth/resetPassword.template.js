import baseEmailTemplate from "../layouts/baseEmail.template.js";

const resetPasswordTemplate = ({ name, resetPasswordUrl }) => {
  return baseEmailTemplate({
    title: "Reset Your Password",

    recipientName: name,

    message:
      "We received a request to reset your Scan & Dine account password. Click the button below to create a new password. If you didn't request this, you can safely ignore this email.",

    buttonText: "Reset Password",

    buttonUrl: resetPasswordUrl,
  });
};

export default resetPasswordTemplate;