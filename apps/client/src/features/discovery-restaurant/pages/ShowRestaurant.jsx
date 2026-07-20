import { useState, useEffect } from "react";
import { useRestaurants } from "@scan/restaurants";
import { Search, X, ChevronDown, RefreshCcw } from "lucide-react";

import { PageLoader } from "@/shared";
import RestaurantCard from "../component/RestaurantCard";

export default function ShowRestaurants() {
  // 1. Filter State
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [city, setCity] = useState("");
  const [cuisine, setCuisine] = useState("");
  const [sort, setSort] = useState("");

  // 2. Debounce Search Logic
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);

  // 3. Construct Query Params (Only include keys that have truthy values)
  const queryParams = {
    ...(debouncedSearch && { search: debouncedSearch }),
    ...(city && { city }),
    ...(cuisine && { cuisine }),
    ...(sort && { sort }),
  };

  // 4. Fetch Data Using React Query (Auto-refetches on queryParams change)
  const { data, isLoading, error } = useRestaurants(queryParams);

  console.log("data received from useRestaurants hook:", data);

  const resetFilters = () => {
    setSearch("");
    setCity("");
    setCuisine("");
    setSort("");
  };

  // Check if any filters are actively applied to conditionally show the reset button
  const hasActiveFilters = search || city || cuisine || sort;

  if (isLoading) {
    return (
      <PageLoader
        text="Syncing restaurant directory..."
        className="min-h-[60vh]"
      />
    );
  }

  if (error) {
    return (
      <div className="py-32 flex flex-col items-center justify-center text-center px-5">
        <div className="w-16 h-16 bg-red-500/10 border border-red-500/20 flex items-center justify-center mb-6 rounded-none-force">
          <span className="text-red-500 font-display text-2xl font-bold">
            !
          </span>
        </div>
        <h2 className="font-display text-2xl font-bold text-foreground mb-2">
          Network Error
        </h2>
        <p className="text-muted-foreground font-ui text-sm">
          Failed to connect to the restaurant database.
        </p>
        <button
          onClick={() => window.location.reload()}
          className="mt-6 px-6 py-3 bg-card border border-border text-foreground font-ui font-bold text-sm hover:bg-accent transition-all rounded-none-force"
        >
          Retry Connection
        </button>
      </div>
    );
  }

  const restaurants = data?.data?.restaurants ?? [];

  return (
    <section className="py-20 bg-background min-h-screen relative overflow-hidden">
      {/* Background Textures */}
      <div className="absolute inset-0 bg-noise opacity-[0.02] dark:opacity-[0.05] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-5 sm:px-8 relative z-10">
        {/* Page Header */}
        {/* Page Header */}
        <div className="mb-10 text-center flex flex-col items-center">
          <h1 className="text-4xl md:text-5xl font-display font-black text-foreground mb-3 tracking-tight">
            Discover <span className="text-brand">Kitchens</span>
          </h1>
          <p className="text-muted-foreground font-ui font-medium max-w-lg mx-auto">
            Explore our curated network of high-performance restaurants.
          </p>
        </div>

        {/* Search & Filter Controls */}
        <div className="mb-12 flex flex-col gap-4">
          {/* Top Row: Search Bar */}
          <div className="relative w-full">
            <Search
              size={16}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
            />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name, city, or cuisine..."
              className="w-full pl-11 pr-11 py-3.5 bg-card border border-border text-foreground text-sm font-ui focus:outline-none focus:border-brand/60 focus:ring-1 focus:ring-brand/30 transition-all rounded-none-force"
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                <X size={14} />
              </button>
            )}
          </div>

          {/* Bottom Row: Dropdowns & Actions */}
          <div className="flex flex-col sm:flex-row flex-wrap gap-4">
            {/* City Select */}
            <div className="relative flex-1 sm:min-w-[160px]">
              <select
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full px-4 pr-10 py-3.5 bg-card border border-border text-foreground text-sm font-ui focus:outline-none focus:border-brand/60 focus:ring-1 focus:ring-brand/30 transition-all rounded-none-force appearance-none cursor-pointer"
              >
                <option value="">All Cities</option>
                <option value="Hyderabad">Hyderabad</option>
                <option value="Mumbai">Mumbai</option>
                <option value="Delhi">Delhi</option>
              </select>
              <ChevronDown
                size={14}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none"
              />
            </div>

            {/* Cuisine Select */}
            <div className="relative flex-1 sm:min-w-[160px]">
              <select
                value={cuisine}
                onChange={(e) => setCuisine(e.target.value)}
                className="w-full px-4 pr-10 py-3.5 bg-card border border-border text-foreground text-sm font-ui focus:outline-none focus:border-brand/60 focus:ring-1 focus:ring-brand/30 transition-all rounded-none-force appearance-none cursor-pointer"
              >
                <option value="">All Cuisines</option>
                <option value="Indian">Indian</option>
                <option value="Chinese">Chinese</option>
                <option value="Continental">Continental</option>
              </select>
              <ChevronDown
                size={14}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none"
              />
            </div>

            {/* Sort Select */}
            <div className="relative flex-1 sm:min-w-[160px]">
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="w-full px-4 pr-10 py-3.5 bg-card border border-border text-foreground text-sm font-ui focus:outline-none focus:border-brand/60 focus:ring-1 focus:ring-brand/30 transition-all rounded-none-force appearance-none cursor-pointer"
              >
                <option value="">Sort By</option>
                <option value="rating">Highest Rated</option>
                <option value="name">Name (A-Z)</option>
                <option value="newest">Newest Added</option>
              </select>
              <ChevronDown
                size={14}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none"
              />
            </div>

            {/* Reset Button (Only shows when filters are active) */}
            {hasActiveFilters && (
              <button
                onClick={resetFilters}
                className="group flex items-center justify-center gap-2 px-6 py-3.5 border border-border bg-transparent text-foreground hover:bg-accent text-sm font-ui transition-all rounded-none-force flex-shrink-0"
              >
                <RefreshCcw
                  size={14}
                  className="group-hover:-rotate-90 transition-transform duration-300"
                />
                Reset
              </button>
            )}
          </div>
        </div>

        {/* Grid Layout & Results Rendering */}
        {!restaurants.length ? (
          <div className="py-24 text-center border border-dashed border-border bg-card/30 rounded-none-force flex flex-col items-center justify-center mt-8">
            <div className="w-12 h-12 bg-muted/50 flex items-center justify-center mb-4 rounded-none-force border border-border">
              <Search size={20} className="text-muted-foreground" />
            </div>
            <h3 className="font-display font-bold text-xl text-foreground mb-2">
              No matches found
            </h3>
            <p className="text-muted-foreground font-ui text-sm mb-6 max-w-sm mx-auto">
              We couldn't find any restaurants matching your current filters.
              Try adjusting your search criteria.
            </p>
            <button
              onClick={resetFilters}
              className="px-6 py-3 bg-brand text-brand-foreground font-ui font-bold text-sm hover:opacity-90 transition-opacity rounded-none-force"
            >
              Clear All Filters
            </button>
          </div>
        ) : (
          <>
            {/* Contextual Results Counter */}
            {hasActiveFilters && (
              <p className="text-sm font-ui text-muted-foreground mb-6">
                Showing{" "}
                <span className="font-bold text-foreground">
                  {restaurants.length}
                </span>{" "}
                results
              </p>
            )}

            <div className="grid gap-8 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
              {restaurants.map((restaurant) => (
                <div key={restaurant.slug} className="h-full">
                  <RestaurantCard restaurant={restaurant} />
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
