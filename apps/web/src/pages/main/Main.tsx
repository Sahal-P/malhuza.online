import { useEffect, useState } from "react";
import Navigation from "./components/Navigation";
import UserProvider from "./components/UserProvider";
import { toast } from "sonner";
import { Outlet } from "react-router-dom";
import SearchCommand from "@/components/common/searchCommand";
import SettingsModal from "@/components/modals/SettingsModal";
import CoverImageModal from "@/components/modals/CoverImage";

const Main = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleConnectionChange = () => {
      setTimeout(() => {
        const isOnlineNow = navigator.onLine;
        setIsOnline(isOnlineNow);
      }, 300);
    };

    window.addEventListener("online", handleConnectionChange);
    window.addEventListener("offline", handleConnectionChange);

    toast.dismiss();
    if (isOnline) {
      toast.success("Connected", { position: "top-center", duration: 1000 });
    } else {
      toast.loading("Reconnecting..", {
        position: "top-center",
        dismissible: false,
        duration: 100000,
      });
    }

    handleConnectionChange();
    return () => {
      window.removeEventListener("online", handleConnectionChange);
      window.removeEventListener("offline", handleConnectionChange);
    };
  }, [isOnline]);

  return (
    <UserProvider>
      <div className="h-screen flex dark:bg-[#1F1F1F] overflow-hidden">
        <Navigation />
        <main className="flex-1 h-full overflow-y-auto bg-[#ffffff] dark:bg-document_bg scrollbar-thin scrollbar-thumb-primary scrollbar-corner-sidebar scrollbar-track-secondary ">
          <SearchCommand />
          <SettingsModal />
          <CoverImageModal />
          <Outlet />
        </main>
      </div>
    </UserProvider>
  );
};

export default Main;
