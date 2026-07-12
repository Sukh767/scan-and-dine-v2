import { useTheme } from "@/shared";
import { http } from "@scan/api";

const LandingPage = () => {
  const theme = useTheme();
  console.log(http.defaults.baseURL);

  console.log(theme);

  return (
    <div>
      <h1>Landing Page</h1>
    </div>
  );
};

export default LandingPage;
