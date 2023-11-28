import axios from "axios";
import Cookies from "js-cookie";
import generateCookieExpirationDates from "@/utils/cookieUtil";
// import { useDispatch } from "react-redux";
// import { LOGOUT_USER, SET_LOADING } from "../redux/sagas/types";
import { toast } from "react-toastify";
import { PostLogout } from "@/components/utils/helpers";

axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL;
// axios.defaults.withCredentials = true;

let needRefresh = false;

axios.interceptors.response.use(
  (resp) => resp,
  async (error) => {
    const RefreshToken = Cookies.get(import.meta.env.VITE_REFRESH_TOKEN);
    if (error.response.status === 401 && !needRefresh && RefreshToken) {
      needRefresh = true;
      const response = await axios.post("token/refresh/", {
        refresh: RefreshToken,
      });
      if (response.status === 200) {
        const { oneDayLater } = generateCookieExpirationDates();
        Cookies.set(
          import.meta.env.VITE_ACCESS_TOKEN,
          response.data.access_token,
          { expires: oneDayLater }
        );
      } else {
        // const dispatch = useDispatch()
        // dispatch({ type: SET_LOADING, payload: true });
        // dispatch({ type: LOGOUT_USER, payload: {} , navigate });
        PostLogout()
      }
      if (response.status === 200) {
        return axios(error.config);
      }
    }
    needRefresh = false;

    // console.log(error,'errrrrr');
    if (error?.name === "AxiosError") {
      const status = error.response?.status;
      if (
        (error.response?.data?.detail && status === 400) ||
        status === 500 ||
        status === 409
      ) {
        return toast.warn(error.response?.data?.detail);
      }
    }

    return error;
  }
);

axios.interceptors.request.use(
  (config) => {
    const Access = Cookies.get(import.meta.env.VITE_ACCESS_TOKEN);
    if (Access) {
      config.headers["Authorization"] = `Bearer ${Access}`;
    }
    // // Add custom header to GET and HEAD requests
    // if (config.method === "get" || config.method === "head") {
    //   config.headers["X-User-Identifier"] = `_identifier_${val}`;
    // }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Details API's

export const LoginWithGoogle = async (credential: string | undefined) =>
  await axios.post(`api/auth/google/`, {
    auth_token: credential,
  });

export const getUser = async () =>
  await axios.get(`api/auth/user/`);

export const Logout = async () => await axios.post('api/auth/logout/', {'refresh': Cookies.get(import.meta.env.VITE_REFRESH_TOKEN)});

  