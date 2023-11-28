import { FC, useEffect, useState } from "react";
import { googleLogout } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import User from "@/components/common/User";
import { Button } from "@/components/ui/button";

interface TestProps {
  
}

const Test: FC<TestProps> = () => {
    const navigate = useNavigate();
  const [user, setUser] = useState({})
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
        setUser(res.data)
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
  useEffect(()=>{

  },[user])
  return (
    <>
  <div className="flex flex-col justify-center items-center gap-5">
  Home
  <Button onClick={logout} variant={'destructive'}>Logout</Button>
  <Button onClick={GetUsr}>Get User</Button>
  <User user={user}/>
  <Button isLoading={true} onClick={test} className="bg-blue-600">test</Button>
</div>
</>)
}

export default Test