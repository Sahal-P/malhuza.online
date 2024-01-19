import  Cookies  from 'js-cookie';
import { Outlet, Navigate } from "react-router-dom";

const PrivateRoute = () => {
  const Access = Cookies.get(import.meta.env.VITE_ACCESS_TOKEN)
  const Refresh = Cookies.get(import.meta.env.VITE_REFRESH_TOKEN)
  if (!Access && !Refresh ) {    
    return <Navigate to={"/page"} />;
  }
  return <Outlet />;
}

export default PrivateRoute