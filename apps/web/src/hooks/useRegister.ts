import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useState, ChangeEvent, FormEvent } from "react";
import { toast } from "sonner";
import useCookies from "./useCookies";
import { useNavigate } from "react-router-dom";
import useLoading from "./useLoading";

const Register = () => {
  const {setAccessAndRefresh} = useCookies()
  const navigate = useNavigate()
  const load = useLoading()
  return useMutation({
    mutationKey: ['registerUser'],
    mutationFn: async ( user : { username: string; email: string; password1: string; password2: string}) => {
      load.onLoading(true)
      const { data } = await axios.post("api/auth/register/", user);
      setAccessAndRefresh({access: data.access, refresh: data.refresh})
      return data;
    },
    onSuccess: () => {
      load.onLoading(false)
      navigate("/documents");
      toast.success("user registerd", {duration:1000});
    },
    onError: () => {
      load.onLoading(false)
      toast.error("Failed to register user", {duration:1000});
    },
  });
}

export default function useRegister() {
  const {mutate: register, isPending: isLoading} = Register()
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password1: "",
    password2: "",
  })
  const {username, email, password1, password2 } = formData

  const onChange = (event: ChangeEvent<HTMLInputElement> ) => {
    const { name, value } = event.target;
    setFormData({...formData, [name]: value}) 
  }
  const onSubmit = (event: FormEvent<HTMLFormElement> ) => {
    event.preventDefault();
    register(formData)
  }
  return {username, email, password1, password2, onChange, onSubmit, isLoading}
}