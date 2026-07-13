import { Outlet } from "react-router-dom";

import  AuthBranding from "./AuthBranding";

const AuthLayout = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto flex min-h-screen items-center justify-center p-8">
        <div className="grid w-full max-w-7xl overflow-hidden rounded-3xl border lg:grid-cols-2">
          <div className="flex items-center justify-center p-12">
            <Outlet />
          </div>
          
          <AuthBranding />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
