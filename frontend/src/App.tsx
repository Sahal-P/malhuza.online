import { Route, Routes } from "react-router-dom"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Home from "./pages/Home"
import PrivateRoute from "./routes/PrivateRoute"
import PublicRoute from "./routes/PublicRoute "

function App() {
  
  return (
    <>
    <Routes>
        {/* <Route element={<PrivateRoute />}> */}
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
