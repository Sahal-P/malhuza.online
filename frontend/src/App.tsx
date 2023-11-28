import { Route, Routes } from "react-router-dom"
import Login from "./pages/auth/Login"
import Register from "./pages/auth/Register"
import Home from "./pages/main/Main"
import PrivateRoute from "./routes/PrivateRoute"
import PublicRoute from "./routes/PublicRoute "
import {Helmet} from "react-helmet";
import Marketing from "./pages/marketing/Marketing"
import PrivacyPolicy from "./pages/privacy_terms/PrivacyPolicy"
import TermsConditions from "./pages/privacy_terms/Terms&Conditions"

function App() {
  // const [theme, setTheme] = useState<"dark" | "light">("light")
  if (!('theme' in localStorage)){
      localStorage.setItem('theme', 'light')
  }
  
  if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    localStorage.setItem('theme', 'dark')
  } 
  if (window.matchMedia('(prefers-color-scheme: light)').matches) {
    localStorage.setItem('theme', 'light')
  } 
  if (localStorage.theme === 'dark') {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }
  return (
    <>
    <Helmet>
                <meta charSet="utf-8" />
                <meta name="referrer" content="no-referrer" />
                <title>Malhuza</title>
                <link rel="canonical" href="http://mysite.com/example" />
                <link rel="icon" type="image/png" href='/logo_j.png' media="(prefers-color-scheme: light)" />
                <link rel="icon" type="image/png" href='/logo_j_dark.png' media="(prefers-color-scheme: dark)" />
    </Helmet>

    <Routes>
        {/* <Route element={<PrivateRoute />}> */}
          <Route path="/page" element={<Marketing/>} />
          <Route path="/PrivacyPolicy" element={<PrivacyPolicy/>} />
          <Route path="/Terms&Conditions" element={<TermsConditions/>} />
          
        <Route element={<PrivateRoute />}>
          <Route path="" element={<Home/>} />
        </Route>
        <Route element={<PublicRoute />}>
          <Route path="/sign-in" element={<Login/>} />
          <Route path="/sign-up" element={<Register/>} />
        </Route>
        
    </Routes>
      
    </>
  )
}

export default App
