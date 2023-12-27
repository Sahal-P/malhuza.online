import { FC, useEffect, useState } from "react";
import Navigation from "./components/Navigation";
// import Spinner from "@/components/common/Spinner";
// import Test from "@/components/common/Test";
import UserProvider from "./components/UserProvider";
import { toast } from "sonner";
import { Outlet } from "react-router-dom";
import SearchCommand from "@/components/common/searchCommand";
import SettingsModal from "@/components/modals/SettingsModal";
import CoverImageModal from "@/components/modals/CoverImage";
// import ChatBox from "./components/Chatbox";
interface MainProps {}

const Main: FC<MainProps> = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    
    const handleConnectionChange = () => {
      setTimeout(() => {
        const isOnlineNow = navigator.onLine;
        setIsOnline(isOnlineNow);
      }, 300); // Adjust the timeout value as needed
    };

    window.addEventListener("online", handleConnectionChange);
    window.addEventListener("offline", handleConnectionChange);

    toast.dismiss();
    if (isOnline) {
      toast.success("Connected", { position: "top-center", duration: 1000 });
    } else {
      toast.loading("Reconnecting..", { position: "top-center", dismissible: false, duration: 100000 });
    }

    handleConnectionChange(); // Initial check
    return () => {
      window.removeEventListener("online", handleConnectionChange);
      window.removeEventListener("offline", handleConnectionChange);
    };
  }, [isOnline]);

  return (
    <UserProvider>

   <div className="h-screen flex dark:bg-[#1F1F1F] ">
    <Navigation/>
      <main className="flex-1 h-full overflow-y-auto bg-[#ffffff] dark:bg-document_bg scrollbar-thin scrollbar-thumb-secondary">
        {/* <div className="w-full h-full  flex justify-center items-center z-[9999999999]">
        <Spinner size={"lg"}/>
        </div> */}
        <SearchCommand />
        <SettingsModal/>
        <CoverImageModal/>
        <Outlet/>
      {/* <ChatBox/> */}
      </main>
   </div>
   </UserProvider>
  );
};

export default Main;
