import baseEmailTemplate from "../layouts/baseEmail.template.js";

const verificationEmailTemplate = ({
  name,
  verificationUrl,
}) => {
  return baseEmailTemplate({
    title: "Verify your email",

    recipientName: name,

    message:
      "Thank you for registering with Scan & Dine. Please verify your email address to activate your account.",

    buttonText: "Verify Email",

    buttonUrl: verificationUrl,
  });
};

export default verificationEmailTemplate;