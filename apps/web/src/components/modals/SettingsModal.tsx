import { FC } from "react";

import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { useSettings } from "@/hooks/useSettings";
import { ThemeDropDown } from "../common/ThemeDropDown";
interface SettingsModalProps {}

const SettingsModal: FC<SettingsModalProps> = ({}) => {
  const settings = useSettings();

  return (
    <Dialog open={settings.isOpen} onOpenChange={settings.onClose}>
      <DialogContent className="dark:bg-document_bg">
        <DialogHeader className="border-b pb-3">
            <h2 className="text-lg font-medium">Settings</h2>
        </DialogHeader>
        <div className="flex items-center justify-between">
            <div className="flex flex-col gap-y-1">
                <Label>
                    Appearance
                </Label>
                <span className="text-[0.8rem] text-muted-foreground">
                    Customize how Notes looks on your device
                </span>
            </div>
            <ThemeDropDown/>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SettingsModal;
