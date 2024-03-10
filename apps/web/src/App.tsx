import { Route, Routes, Navigate } from "react-router-dom";
import { Suspense, lazy } from "react";
import PrivateRoute from "./routes/PrivateRoute";
import PublicRoute from "./routes/PublicRoute ";
import { Helmet } from "react-helmet-async";
import Marketing from "./pages/marketing/Marketing";

const PrivacyPolicy = lazy(() => import("./pages/privacy_terms/PrivacyPolicy"));
const TermsConditions = lazy(
  () => import("./pages/privacy_terms/Terms&Conditions")
);
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import WelcomeDocument from "./pages/main/components/WelcomeDocument";
import MainSkeleton, {
  ContentSkeleton,
} from "./components/skeleton/MainSkeleton";
import { CommonSpinner, Loading } from "./components/common/Spinner";
const Document = lazy(() => import("./pages/main/components/Document"));
const Main = lazy(() => import("./pages/main/Main"));

const NotFound = () => {
  return (
    <>
    <div>
      Not Found
    </div>
    </>
  )
}

function App() {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <meta name="referrer" content="strict-origin-when-cross-origin" />
        <meta name="theme-color" content="#1F1F1F" />
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
      <Loading />
      <Routes>
        {/* <Route element={<PrivateRoute />}> */}
        <Route path="/" element={<Navigate to="/page" />} />
        <Route path="/page" element={<Marketing />} />
        <Route
          path="/PrivacyPolicy"
          element={
            <Suspense fallback={<CommonSpinner />}>
              <PrivacyPolicy />
            </Suspense>
          }
        />
        <Route
          path="/Terms&Conditions"
          element={
            <Suspense fallback={<CommonSpinner />}>
              <TermsConditions />
            </Suspense>
          }
        />

        <Route element={<PrivateRoute />}>
          <Route
            path="/documents/"
            element={
              <Suspense fallback={<MainSkeleton />}>
                <Main />
              </Suspense>
            }
          >
            <Route path="" element={<WelcomeDocument />} />

            <Route
              path=":documentId"
              element={
                <Suspense fallback={<ContentSkeleton />}>
                  <Document />
                </Suspense>
              }
            />
          </Route>
        </Route>
        <Route element={<PublicRoute />}>
          <Route path="/sign-in" element={<Login />} />
          <Route path="/sign-up" element={<Register />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
