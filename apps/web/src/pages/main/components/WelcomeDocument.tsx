import { FC } from "react";
import { useUser } from "./UserProvider";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import useCreateDocument from "@/hooks/useCreateDocument";
import { DEFAULT_TITLE } from "@/types/constant";

interface WelcomeDocumentProps {}

const WelcomeDocument: FC<WelcomeDocumentProps> = () => {
  const { user } = useUser();
  const { mutate } = useCreateDocument();

  const handleCreateDocument = () => {
    mutate({ title: DEFAULT_TITLE });
  };
  return (
    <div className="h-full flex flex-col items-center justify-center space-y-4">
      <img
        src="/math_chalk_dark.png"
        height={300}
        width={300}
        className="hidden dark:block md:h-[500px] w-[500px]"
        alt="empty_dark"
      />
      <img
        src="/math_chalk.png"
        height={300}
        width={300}
        className="dark:hidden md:h-[500px] w-[500px]"
        alt="empty"
      />
      <h2 className="text-lg font-robotom font-medium">
        Welcome to {user?.username}'s Notes
      </h2>
      <Button onClick={handleCreateDocument}>
        <PlusCircle className="h-4 w-4 mr-2"/>
        Create a note
      </Button>
    </div>
  );
};

export default WelcomeDocument;
