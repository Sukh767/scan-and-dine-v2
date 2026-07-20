import { useParams } from "react-router-dom";
import { useRestaurant } from "@scan/restaurants";
import { PageLoader } from "@/shared";
import { FadeUp } from "@/components/motion";

// Components
import RestaurantHero from "../components/RestaurantHero";
import RestaurantOverview from "../components/RestaurantOverview";
import RestaurantFacilities from "../components/RestaurantFacilities";
import RestaurantLocation from "../components/RestaurantLocation";
import RestaurantContact from "../components/RestaurantContact";
import RestaurantHours from "../components/RestaurantHours";
import RestaurantSocials from "../components/RestaurantSocials";
import RestaurantCTA from "../components/RestaurantCTA";

export default function RestaurantDetailsPage() {
  const { slug } = useParams();
  const { data, isLoading } = useRestaurant(slug);

  const restaurant = data?.data;

  if (isLoading) {
    return <PageLoader text="Loading restaurant profile..." />;
  }

  if (!restaurant) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background text-foreground font-display text-2xl font-medium">
        Restaurant not found.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background relative overflow-x-hidden pb-32">
      
      {/* 1. Immersive Hero Section */}
      <RestaurantHero restaurant={restaurant} />

      {/* Main Content Area */}
      <main className="max-w-6xl mx-auto px-5 sm:px-8 mt-16 relative z-10">
        <FadeUp delay={0.1}>
          <RestaurantOverview restaurant={restaurant} />
        </FadeUp>

        <FadeUp delay={0.2}>
          <RestaurantFacilities restaurant={restaurant} />
        </FadeUp>

        {/* 2-Column Layout for Location and Contact */}
        <FadeUp delay={0.3}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            <RestaurantLocation restaurant={restaurant} />
            <RestaurantContact restaurant={restaurant} />
          </div>
        </FadeUp>

        {/* Full Width Layout for Hours */}
        <FadeUp delay={0.4}>
          <RestaurantHours restaurant={restaurant} />
        </FadeUp>

        {/* Full Width Layout for Socials */}
        <FadeUp delay={0.5}>
          <RestaurantSocials restaurant={restaurant} />
        </FadeUp>
      </main>

      <RestaurantCTA restaurant={restaurant} />
    </div>
  );
}