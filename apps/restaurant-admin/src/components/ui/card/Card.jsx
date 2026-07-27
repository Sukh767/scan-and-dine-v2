const Card = (props) => {
  const { variant, extra, children, ...rest } = props;
  return (
    <div
      className={`shadow-3xl shadow-shadow-500 dark:!bg-navy-800 relative !z-5 flex flex-col rounded-[20px] bg-white bg-clip-border dark:text-white dark:shadow-none ${extra}`}
      {...rest}
    >
      {children}
    </div>
  );
};

export default Card;
