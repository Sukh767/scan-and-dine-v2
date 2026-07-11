import { EmptyState, PageLoader, AppPreloader, NotFound } from "@/shared";

export const LandingPage = () => {
  return (
    <>
      <AppPreloader />

      <PageLoader />

      <EmptyState
        title="No Restaurants"
        description="Restaurants will appear here."
      />

      <NotFound />
    </>
  );
};
