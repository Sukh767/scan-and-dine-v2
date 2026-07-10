import baseEmailTemplate from "../layouts/baseEmail.template.js";

const welcomeEmailTemplate = ({ name }) => {
  return baseEmailTemplate({
    title: "Welcome to Scan & Dine",

    recipientName: name,

    message:
      "Your email has been verified successfully. Your account is now active and ready to use.",

    buttonText: "Login",

    buttonUrl: `${process.env.CUSTOMER_APP_URL}/login`,
  });
};

export default welcomeEmailTemplate;