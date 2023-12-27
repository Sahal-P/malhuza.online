import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
// import { jwtDecode } from "jwt-decode";
import { LoginWithGoogle } from "@/apis";
import generateCookieExpirationDates from "@/utils/cookieUtil";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

export default function LoginWith() {
  const navigate = useNavigate()
  return (
    <div className="flex flex-col space-y-5">
      <span className="flex items-center justify-center text-center space-x-2">
        <span className="h-px bg-gray-400 w-14"></span>
        <span className="font-normal text-gray-500">continue with</span>
        <span className="h-px bg-gray-400 w-14"></span>
      </span>
      <div className="flex flex-col space-y-4 items-center w-full">
        <GoogleOAuthProvider clientId="334091573966-uf7c4ubsorjvg3sp5euhdu3qdcddo9nk.apps.googleusercontent.com">
          <GoogleLogin type="standard" auto_select itp_support use_fedcm_for_prompt ux_mode="popup"
            shape="rectangular"
            width={'300'}
            onSuccess={(credentialResponse) => {
              try {
                LoginWithGoogle(credentialResponse.credential).then((res) => {
                  const { sevenDaysLater, oneDayLater } =
                    generateCookieExpirationDates();
                  Cookies.set(
                    import.meta.env.VITE_ACCESS_TOKEN,
                    res.data.tokens.access,
                    {
                      expires: oneDayLater,
                      sameSite: "Strict",
                      secure: true
                    }
                  );
                  Cookies.set(
                    import.meta.env.VITE_REFRESH_TOKEN,
                    res.data.tokens.refresh,
                    {
                      expires: sevenDaysLater,
                      sameSite: "Strict",
                      secure: true
                    }
                  );
                  navigate("/documents");
                });
              } catch (error) {
                //
                console.log(error);
                
              }

              // let decoded = jwtDecode(credentialResponse.credential)
              // console.log(decoded);
            }}
            onError={() => {
              console.log("Login Failed");
            }}
            useOneTap
          />
        </GoogleOAuthProvider>
      </div>
      <span className="flex items-center justify-center text-center space-x-2">
        <span className="h-px bg-gray-400 w-14"></span>
        <span className="font-normal text-gray-500">or</span>
        <span className="h-px bg-gray-400 w-14"></span>
      </span>
    </div>
  );
}


