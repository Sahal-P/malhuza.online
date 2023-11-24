import { useState, ChangeEvent, FormEvent } from "react";


export default function useRegister() {
    // const router = useRouter();
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    username: "",
    password: "",
    confirm_password: "",
  })
  const {first_name, last_name, email, username, password, confirm_password} = formData

  const onChange = (event: ChangeEvent<HTMLInputElement> ) => {
    const { name, value } = event.target;
    setFormData({...formData, [name]: value}) 
  }
  const onSubmit = (event: FormEvent<HTMLFormElement> ) => {
    event.preventDefault();

    // register({first_name, last_name, email, username, password, confirm_password})
    // .then((res) => {
    //   console.log(res)
    //   toast.success("success")
    //   // router.push('/sign-in/')
    // }).catch((err) => {
    //   toast.error(err)
    // })
  }
  return {first_name, last_name, email, username, password, confirm_password, onChange, onSubmit}
}