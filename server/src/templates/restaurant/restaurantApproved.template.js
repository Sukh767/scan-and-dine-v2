import baseEmailTemplate from "../layouts/baseEmail.template.js";

const restaurantApprovedTemplate = ({ ownerName, restaurantName }) => {
  return baseEmailTemplate({
    title: "🎉 Restaurant Approved",
    content: `
      <p>Congratulations <strong>${ownerName}</strong>,</p>

      <p>
        Your restaurant
        <strong>${restaurantName}</strong>
        has been approved by the Scan & Dine team.
      </p>

      <p>
        You can now log in and start configuring your restaurant.
      </p>

      <ul>
        <li>Manage Menu</li>
        <li>Create Tables</li>
        <li>Invite Staff</li>
        <li>Generate QR Codes</li>
        <li>Accept Orders</li>
      </ul>

      <p>
        Welcome to Scan & Dine.
      </p>
    `,
  });
};

export default restaurantApprovedTemplate;
