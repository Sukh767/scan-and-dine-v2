import { ThemeProvider } from "@/context/ThemeContext";
import Preloader from "@/components/ui/loader/PreLoader";
import { PreLoader } from "@/components/ui/loader/Loader";
import { useEffect, useState } from "react";

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
    </ThemeProvider>
  );
};

export default App;
