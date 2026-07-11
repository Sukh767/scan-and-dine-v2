export const EmptyState = ({
  title = "Nothing Here",
  description = "No data available.",
  action = null,
}) => {
  return (
    <div>
      <h2>{title}</h2>

      <p>{description}</p>

      {action}
    </div>
  );
};
