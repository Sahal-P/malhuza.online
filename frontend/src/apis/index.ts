import axios from "axios";
import Cookies from "js-cookie";
import generateCookieExpirationDates from "@/utils/cookieUtil";
// import { useDispatch } from "react-redux";
// import { LOGOUT_USER, SET_LOADING } from "../redux/sagas/types";
import { toast } from "sonner";
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
      const response = await axios.post("api/auth/token/refresh/", {
        refresh: RefreshToken,
      });

      if (response.status === 200) {
        const { oneDayLater } = generateCookieExpirationDates();
        Cookies.set(
          import.meta.env.VITE_ACCESS_TOKEN,
          response.data.access,
          { expires: oneDayLater }
        );
      } else {
        PostLogout()
        toast.error("Your Session Has Expired Please Login Again", {
          action: {
            label: 'Log in',
            onClick: () => window.location.href = "/sign-in"
          },
          duration: 7000,
          position:"top-center",
          onAutoClose: () => window.location.href = "/sign-in"
        })
        
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
        return toast.error(error.response?.data?.detail, {style: {
          color: 'white',
          backgroundColor: 'red'
        }});
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

export const docsTest = async () => await axios.post('api/docs/');
export const CreateDocument = async (title: string) => await axios.post('api/docs/create/', {title});