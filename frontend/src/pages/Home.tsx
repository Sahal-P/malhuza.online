import { FC } from "react";
import { googleLogout } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";

interface HomeProps {}

const Home: FC<HomeProps> = () => {
  const navigate = useNavigate();
  const logout = () => {
    googleLogout();
    Cookies.remove(import.meta.env.VITE_ACCESS_TOKEN);
    Cookies.remove(import.meta.env.VITE_REFRESH_TOKEN);
    navigate("/sign-in");
  };
  const GetUsr = () => {
    axios
      .get("http://127.0.0.1:8000/api/auth/user/")
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const test = () => {
    axios
      .post("http://127.0.0.1:8000/api/auth/")
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div>
      Home
      <div onClick={logout}>Logout</div>
      <div onClick={GetUsr}>Get User</div>
      <div onClick={test}>test</div>
    </div>
  );
};

export default Home;
