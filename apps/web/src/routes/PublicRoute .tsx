import  Cookies  from 'js-cookie';
import { Outlet, Navigate } from "react-router-dom";

const PublicRoute = () => {
  const Access = Cookies.get(import.meta.env.VITE_ACCESS_TOKEN)
  const Refresh = Cookies.get(import.meta.env.VITE_REFRESH_TOKEN)  
  if (Access && Refresh) {
    return <Navigate to={"/documents"} />;
  }
  return <Outlet />;
}

export default PublicRoute