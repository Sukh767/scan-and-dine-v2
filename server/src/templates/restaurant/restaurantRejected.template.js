import baseEmailTemplate from "../layouts/baseEmail.template.js";

const restaurantRejectedTemplate = ({ ownerName, restaurantName, reason }) => {
  return baseEmailTemplate({
    title: "Restaurant Needs Attention",
    content: `
      <p>Hi <strong>${ownerName}</strong>,</p>

      <p>
        We reviewed your restaurant
        <strong>${restaurantName}</strong>.
      </p>

      <p>
        Unfortunately we couldn't approve it this time.
      </p>

      <div style="background:#fff3cd;padding:16px;border-radius:8px;margin:20px 0;">
        <strong>Reason:</strong><br/>
        ${reason}
      </div>

      <p>
        Please update your restaurant information and
        submit it again for review.
      </p>
    `,
  });
};

export default restaurantRejectedTemplate;
