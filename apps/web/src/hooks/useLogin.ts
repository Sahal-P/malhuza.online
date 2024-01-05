import { useState, ChangeEvent, FormEvent } from "react";
import useCookies from "./useCookies";
import { useNavigate } from "react-router-dom";
import useLoading from "./useLoading";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "sonner";

const Login = () => {
  const {setAccessAndRefresh} = useCookies()
  const navigate = useNavigate()
  const load = useLoading()
  return useMutation({
    mutationKey: ['LoginUser'],
    mutationFn: async ( user : { email: string; password: string;}) => {
      load.onLoading(true)
      const { data } = await axios.post("api/auth/login/", user);
      setAccessAndRefresh({access: data.access, refresh: data.refresh})
      return data;
    },
    onSuccess: () => {
      load.onLoading(false)
      navigate("/documents");
      toast.success("user logined", {duration:1000});
    },
    onError: () => {
      load.onLoading(false)
      toast.error("Failed to login user", {duration:1000});
    },
  });
}

export default function useLogin() {
  const {mutate: login, isPending: isLoading} = Login()
  const [formData, setFormData] = useState({
    email: "",
    password: "", 
  })
  const {email, password } = formData

  const onChange = (event: ChangeEvent<HTMLInputElement> ) => {
    const { name, value } = event.target;
    setFormData({...formData, [name]: value}) 
  }
  const onSubmit = (event: FormEvent<HTMLFormElement> ) => {
    event.preventDefault();
    login(formData)
  }
  return {email, password, onChange, onSubmit, isLoading}
}