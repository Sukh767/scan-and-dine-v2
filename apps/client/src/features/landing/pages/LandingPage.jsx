import { useAuth } from "@scan/auth";

const LandingPage = () => {
  const auth = useAuth();

  console.log(auth);

  return <h1>Landing Page</h1>;
};

export default LandingPage;
