import { EmptyState, PageLoader, AppPreloader, NotFound } from "@/shared";
import { useState } from "react";

const LandingPage = () => {
  const [loaded, setLoaded] = useState(false);
  return (
    <>
      <AppPreloader onCompleted={() => setLoaded(true)} />

      <PageLoader />

      <EmptyState
        title="No Restaurants"
        description="Restaurants will appear here."
      />

      <NotFound />
    </>
  );
};

export default LandingPage;
