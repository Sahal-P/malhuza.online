import generateCookieExpirationDates from "@/utils/cookieUtil";
import Cookies from "js-cookie";

const useCookies = () => {
  const { sevenDaysLater, oneDayLater } = generateCookieExpirationDates();

  const setAccessAndRefresh = ({access, refresh}: {access: string; refresh: string}) => {
    Cookies.set(import.meta.env.VITE_ACCESS_TOKEN, access, {
        expires: oneDayLater,
        sameSite: "Strict",
        // secure: true,
      });
      Cookies.set(import.meta.env.VITE_REFRESH_TOKEN, refresh, {
        expires: sevenDaysLater,
        sameSite: "Strict",
        // secure: true,
      });
  }
  
  return {setAccessAndRefresh}
};

export default useCookies