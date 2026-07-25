const ServerError = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-6xl font-bold text-red-600">500</h1>
      <p className="text-xl text-gray-700 mt-4">Internal Server Error</p>
      <p className="text-gray-600 mt-2">
        Oops! Something went wrong on our end. Please try again later.
      </p>
    </div>
  );
};

export default ServerError;
