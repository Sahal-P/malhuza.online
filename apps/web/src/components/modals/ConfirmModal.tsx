import React, { FC } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface ConfirmModalProps {
  children: React.ReactNode;
  onConfirm: () => void;
}

const ConfirmModal: FC<ConfirmModalProps> = ({ children, onConfirm }) => {
    const handleConfirm = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.stopPropagation()
        onConfirm()
    }
  return (
    <AlertDialog>
      <AlertDialogTrigger onClick={(e) => e.stopPropagation()} asChild>
        {children}
      </AlertDialogTrigger>
      <AlertDialogContent className="dark:bg-document_bg">
        <AlertDialogHeader>
            <AlertDialogTitle>
                Are you absolutely sure?
            </AlertDialogTitle>
            <AlertDialogDescription>
                This action cannot be undone.
            </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
            <AlertDialogCancel onClick={e => e.stopPropagation()}>
                Cancel
            </AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirm}>
                Confirm
            </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ConfirmModal;
