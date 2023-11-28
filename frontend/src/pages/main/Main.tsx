import { FC} from "react";
import Navigation from "./components/Navigation";
import Document from "./components/Document";
// import Spinner from "@/components/common/Spinner";
// import Test from "@/components/common/Test";
import UserProvider from "./components/UserProvider";
interface MainProps {}

const Main: FC<MainProps> = () => {
  return (
    <UserProvider>
   <div className="h-screen flex dark:bg-[#1F1F1F] ">
    <Navigation/>
      <main className="flex-1 h-full overflow-y-auto bg-[#ffffff] dark:bg-document_bg">
        {/* <div className="w-full h-full  flex justify-center items-center z-[9999999999]">
        <Spinner size={"lg"}/>
        </div> */}
        <Document/>
      </main>
   </div>
   </UserProvider>
  );
};

export default Main;
