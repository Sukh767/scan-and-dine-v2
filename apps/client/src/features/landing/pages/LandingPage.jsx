import { useAuth } from "@scan/auth";
import { toast } from "sonner";

const LandingPage = () => {
  const auth = useAuth();

  console.log(auth);

  return (
    <div className="main">
      Landing Page
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded"
        onClick={() => toast.success("Working")}
      >
        Test Toast
      </button>
    </div>
  );
};

export default LandingPage;
