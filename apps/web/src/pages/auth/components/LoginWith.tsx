import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
// import { jwtDecode } from "jwt-decode";
import { LoginWithGoogle } from "@/apis";
import { useNavigate } from "react-router-dom";
import useLoading from "@/hooks/useLoading";
import { toast } from "sonner";
import { useTheme } from "@/components/common/ThemeProvider";
import useCookies from "@/hooks/useCookies";

export default function LoginWith() {
  const navigate = useNavigate();
  const loading = useLoading();
  const {theme} = useTheme()
  const {setAccessAndRefresh} = useCookies()
  return (
    <div className="flex flex-col space-y-5">
      <span className="flex items-center justify-center text-center space-x-2">
        <span className="h-px bg-gray-400 w-14"></span>
        <span className="font-normal text-gray-500 dark:text-gray-200">continue with</span>
        <span className="h-px bg-gray-400 w-14"></span>
      </span>
      <div className="flex flex-col space-y-4 items-center w-full">
        <GoogleOAuthProvider clientId="334091573966-uf7c4ubsorjvg3sp5euhdu3qdcddo9nk.apps.googleusercontent.com">
          <GoogleLogin
            type="standard"
            auto_select
            itp_support
            use_fedcm_for_prompt
            ux_mode="popup"
            shape="rectangular"
            theme={theme === 'dark' && "filled_black" || theme === 'light' && "outline" || "filled_blue"}
            width={"300"}
            onSuccess={(credentialResponse) => {
              try {
                loading.onLoading(true);
                LoginWithGoogle(credentialResponse.credential)
                  .then((res) => {
                    setAccessAndRefresh({access: res.data.tokens.access, refresh: res.data.tokens.refresh})
                    loading.onLoading(false);
                    navigate("/documents");
                  })
                  .catch((error) => {
                    loading.onLoading(false);
                    console.log(error);
                    toast.error("Error occured during authentication");
                  });
              } catch (error) {
                loading.onLoading(false);
                console.log(error);
                toast.error("Error occured during authentication");
              }


            }}
            onError={() => {
              loading.onLoading(false);
            }}
            useOneTap
          />
        </GoogleOAuthProvider>
      </div>
      <span className="flex items-center justify-center text-center space-x-2">
        <span className="h-px bg-gray-400 w-14"></span>
        <span className="font-normal text-gray-500 dark:text-gray-200">or</span>
        <span className="h-px bg-gray-400 w-14"></span>
      </span>
    </div>
  );
}
