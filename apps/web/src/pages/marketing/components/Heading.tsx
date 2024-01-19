import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Heading = () => {
  const navigate = useNavigate()

  return (
    <div className="max-w-3xl space-y-4 ">
      <h1 className="text-3xl sm:text-5xl md:text-6xl font-medium font-robotom">
        Your Ideas, Documents, & Plans. Unified. Welcome to{" "}
        <span className="underline font-bold">Notes</span>
        <span className="text-sm font-extrabold"> by sahal</span>
      </h1>
      <h3 className="text-base sm:text-xl md:text-2xl font-medium">
        Notes is connected workspace where <br />
        better, faster, work happens.
      </h3>
      <Button onClick={() => navigate('/sign-in')}>
        Enter Notes <ArrowRight className="h-4 w-4 ml-2" />
      </Button>
    </div>
  );
};

export default Heading;
