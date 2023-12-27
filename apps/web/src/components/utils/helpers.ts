import { googleLogout } from "@react-oauth/google";
import Cookies from "js-cookie";

export const PostLogout = () => {
  googleLogout();
  Cookies.remove(import.meta.env.VITE_ACCESS_TOKEN);
  Cookies.remove(import.meta.env.VITE_REFRESH_TOKEN);
};
