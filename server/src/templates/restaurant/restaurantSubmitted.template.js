import baseEmailTemplate from "../layouts/baseEmail.template.js";

const restaurantSubmittedTemplate = ({ ownerName, restaurantName }) => {
  return baseEmailTemplate({
    title: "Restaurant Registration Submitted",
    content: `
      <p>Hi <strong>${ownerName}</strong>,</p>

      <p>
        Thank you for registering
        <strong>${restaurantName}</strong>
        on <strong>Scan & Dine</strong>.
      </p>

      <p>
        We've received your restaurant onboarding request.
        Our team will review your details and notify you once
        the verification process is complete.
      </p>

      <div style="background:#f8f9fa;padding:16px;border-radius:8px;margin:20px 0;">
        <strong>Status:</strong> Pending Approval
      </div>

      <p>
        You don't need to do anything right now.
        We'll email you as soon as your restaurant is reviewed.
      </p>
    `,
  });
};

export default restaurantSubmittedTemplate;
