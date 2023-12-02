import { FC } from 'react'
import  Cookies  from 'js-cookie';
import { Outlet, Navigate } from "react-router-dom";

interface PublicRouteProps {
  
}

const PublicRoute: FC<PublicRouteProps> = () => {
  const Access = Cookies.get(import.meta.env.VITE_ACCESS_TOKEN)
  const Refresh = Cookies.get(import.meta.env.VITE_REFRESH_TOKEN)  
  if (Access && Refresh) {
    return <Navigate to={"/document"} />;
  }
  return <Outlet />;
}

export default PublicRoute