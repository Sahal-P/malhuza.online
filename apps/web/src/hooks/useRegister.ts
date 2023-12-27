
import { useState, ChangeEvent, FormEvent } from "react";
// import { useAppDispatch } from "@/redux/hooks";
// import { setAuth } from "@/redux/features/authSlice";

// import {useCookies} from 'react-cookie'

export default function useRegister() {
  // const [cookie, setCookie] = useCookies(["token"])
  //   const dispatch = useAppDispatch()
  const isLoading = false
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirm_password: "",
  })
  const {username, email, password, confirm_password } = formData

  const onChange = (event: ChangeEvent<HTMLInputElement> ) => {
    const { name, value } = event.target;
    setFormData({...formData, [name]: value}) 
  }
  const onSubmit = (event: FormEvent<HTMLFormElement> ) => {
    event.preventDefault();
    console.log('submited', formData);
    
    // login({email, password})
    // .then((res) => {
    //   setCookie("token", JSON.stringify(res), {
    //     path: "/",
    //     maxAge: 3600, // Expires after 1hr
    //     sameSite: true,
    //     })
    //   dispatch(setAuth())
    //   toast.success("success")
    //   router.push('/discovery')
    // }).catch((err) => {
    //   toast.error('error',err)
    // })
  }
  return {username, email, password, confirm_password, onChange, onSubmit, isLoading}
}