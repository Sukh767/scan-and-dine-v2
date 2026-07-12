import { useTheme } from "@/shared";

const LandingPage = () => {
  const theme = useTheme();

  console.log(theme);

  return (
    <div>
      <h1>Landing Page</h1>
    </div>
  );
};

export default LandingPage;
