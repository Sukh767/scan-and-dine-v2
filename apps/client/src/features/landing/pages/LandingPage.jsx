import { useState } from "react";
import PageTransition from "../../../shared/transitions/PageTransition";
import { AppPreloader } from "../../../shared/feedback/AppPreloader/AppPreloader";

export default function LandingPage() {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="min-h-screen bg-surface flex flex-col pt-0 text-gray-500">
      <AppPreloader onComplete={() => setLoaded(true)} />
      {loaded && (
        <PageTransition>
          <main>
            Hero Section
            <section>Features Section</section>
            <section>CTA Section</section>
          </main>
        </PageTransition>
      )}
    </div>
  );
}
