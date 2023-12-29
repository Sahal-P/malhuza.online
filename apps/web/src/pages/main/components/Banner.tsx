import { FC } from "react";
import useDocumentRestore from "@/hooks/useArchiveRestore";
import useDeleteDocument from "@/hooks/useDeleteDocument";
import { useUser } from "./UserProvider";
import { Button } from "@/components/ui/button";
import ConfirmModal from "@/components/modals/ConfirmModal";

interface BannerProps {
  documentId: string;
  isCollapsed: boolean
}

const Banner: FC<BannerProps> = ({ documentId, isCollapsed }) => {
  const { setRestored } = useUser();
  const { mutate: DocumentRestoreMutate } = useDocumentRestore(
    "Restore",
    setRestored
  );
  const { mutate: DocumentRemoveMutate } = useDeleteDocument();

  const onRestore = () => {
    DocumentRestoreMutate({ id: documentId, type: "Restore" });
  };
  const onRemove = () => {
    DocumentRemoveMutate({ id: documentId });
  };
  return (
    <div className={`w-full bg-rose-500 text-center text-sm p-2 text-white flex items-center gap-x-2 justify-center ${!isCollapsed && 'max-sm:hidden'}`}>
      <p>This page is in the Trash.</p>
      <Button
        size={"sm"}
        variant={"outline"}
        onClick={onRestore}
        className="border-white bg-transparent hover:bg-primary/5 text-white hover:text-white p-1 px-2 h-auto font-normal"
      >
        Restore page
      </Button>
      <ConfirmModal title="Are you sure?" description="You want to delete this item, this action cannot be undone."  onConfirm={onRemove}>
      <Button
        size={"sm"}
        variant={"outline"}
        className="border-white bg-transparent hover:bg-primary/5 text-white hover:text-white p-1 px-2 h-auto font-normal"
      >
        delete forever
      </Button>
      </ConfirmModal>
    </div>
  );
};

export default Banner;
