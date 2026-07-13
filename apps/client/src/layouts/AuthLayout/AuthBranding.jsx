const AuthBranding = () => {
  return (
    <div className="hidden lg:flex flex-col justify-between p-10 border-l">

      <div>

        <h2 className="text-3xl font-bold">
          Scan & Dine
        </h2>

        <p className="mt-4 text-muted-foreground">
          Discover restaurants, reserve tables,
          scan QR menus and order instantly.
        </p>

      </div>

      <div className="flex-1 flex items-center justify-center">

        Restaurant Illustration

      </div>

      <p className="text-xs text-muted-foreground">
        Smart Restaurant Platform
      </p>

    </div>
  );
};

export default AuthBranding;