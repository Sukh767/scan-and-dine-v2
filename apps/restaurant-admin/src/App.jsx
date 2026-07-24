import { ThemeProvider } from "@/context/ThemeContext";
import Preloader from "@/components/ui/loader/PreLoader";
import { PreLoader } from "@/components/ui/loader/Loader";
import { useEffect, useState } from "react";
import { Routes } from "react-router-dom";
import AuthLayout from "@/layouts/AuthLayout";
import { Route } from "react-router-dom";

const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1800);
    return () => clearTimeout(t);
  }, []);
  return (
    <ThemeProvider>
      {/* <Preloader /> */}
      <PreLoader show={loading} />
      <Routes>
        <Route path="auth/*" element={<AuthLayout />} />
      </Routes>
    </ThemeProvider>
  );
};

export default App;
