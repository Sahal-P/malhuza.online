import { Route, Routes, Navigate } from "react-router-dom";
import { Suspense, lazy } from "react";
import PrivateRoute from "./routes/PrivateRoute";
import PublicRoute from "./routes/PublicRoute ";
// import {Helmet} from "react-helmet";
import { Helmet } from "react-helmet-async";

// const Spinner = lazy(() => import("./components/common/Spinner"));
import Marketing from "./pages/marketing/Marketing";

const PrivacyPolicy = lazy(() => import("./pages/privacy_terms/PrivacyPolicy"));
const TermsConditions = lazy(
  () => import("./pages/privacy_terms/Terms&Conditions")
);
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import WelcomeDocument from "./pages/main/components/WelcomeDocument";
import MainSkeleton from "./components/skeleton/MainSkeleton";
import { CommonSpinner } from "./components/common/Spinner";
import Document from "./pages/main/components/Document";
const Home = lazy(() => import("./pages/main/Main"));

function App() {
  // const [theme, setTheme] = useState<"dark" | "light">("light")
  // if (!("theme" in localStorage)) {
  //   localStorage.setItem("theme", "light");
  // }

  // if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
  //   localStorage.setItem("theme", "dark");
  // }
  // if (window.matchMedia("(prefers-color-scheme: light)").matches) {
  //   localStorage.setItem("theme", "light");
  // }
  // if (localStorage.theme === "dark") {
  //   document.documentElement.classList.add("dark");
  // } else {
  //   document.documentElement.classList.remove("dark");
  // }
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <meta name="referrer" content="strict-origin-when-cross-origin" />
        <title>Malhuza</title>
        <link rel="canonical" href="http://mysite.com/example" />
        <link
          rel="icon"
          type="image/png"
          href="/logo_j.png"
          media="(prefers-color-scheme: light)"
        />
        <link
          rel="icon"
          type="image/png"
          href="/logo_j_dark.png"
          media="(prefers-color-scheme: dark)"
        />
      </Helmet>

      <Routes>
        {/* <Route element={<PrivateRoute />}> */}
        <Route path="/" element={<Navigate to="/page" />} />
        <Route path="/page" element={<Marketing />} />
        <Route
          path="/PrivacyPolicy"
          element={
            <Suspense fallback={<CommonSpinner/>}>
              <PrivacyPolicy />
            </Suspense>
          }
        />
        <Route
          path="/Terms&Conditions"
          element={
            <Suspense fallback={<CommonSpinner/>}>
              <TermsConditions />
            </Suspense>
          }
        />

        <Route element={<PrivateRoute />}>
          <Route
            path="/documents/"
            element={
              <Suspense fallback={<MainSkeleton/>}>
                <Home />
              </Suspense>
            }
          >
            <Route path="" element={<WelcomeDocument />} />
            <Route path=":documentId" element={<Document/>} />
          </Route>
        </Route>
        <Route element={<PublicRoute />}>
          <Route path="/sign-in" element={<Login />} />
          <Route path="/sign-up" element={<Register />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
