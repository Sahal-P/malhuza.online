import { Form } from ".";
import useRegister from "@/hooks/useRegister";
import LoginWith from "./LoginWith";

export default function RegisterForm() {
  const { username, email, password1, password2, isLoading, onChange, onSubmit } = useRegister();
  const config = [
    {
      labelText: "Username",
      labelId: "username",
      type: "username",
      value: username,
      required: true,
    },
    {
      labelText: "Email",
      labelId: "email",
      type: "email",
      value: email,
      required: true,
    },
    {
      labelText: "Password",
      labelId: "password1",
      type: "password",
      value: password1,
      required: true,
      link: true,
    },
    {
      labelText: "Confirm password",
      labelId: "password2",
      type: "password",
      value: password2,
      required: true,
      link: true,
    },
  ];

  return (
    <>
      <Form
        config={config}
        isLoading={isLoading}
        btnTxt="Register"
        onChange={onChange}
        onSubmit={onSubmit}
        LoginWith={LoginWith}
      ></Form>
    </>
  );
}
