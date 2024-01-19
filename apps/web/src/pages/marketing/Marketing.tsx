import { Helmet } from "react-helmet-async";
import Heading from "./components/Heading";
import Heroes from "./components/Heroes";
import Footer from "./components/Footer";

const Marketing = () => {
  return (
    <>
      <Helmet>
        <title>Welcome to malhuza</title>
        <meta name="description" content="malhuza is a notes writing application" />
        <meta name="keywords" content="malhuza, notes, writing, share, content" />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Helmet>
      <div className="min-h-full h-screen flex flex-col dark:bg-document_bg">
        <div className="flex flex-col justify-center items-center md:justify-start text-center gap-y-8 flex-1 px-6 pb-10">
          <Heading/>
          <Heroes/>
        </div>
        <Footer/>
      </div>
    </>
  );
};

export default Marketing;
