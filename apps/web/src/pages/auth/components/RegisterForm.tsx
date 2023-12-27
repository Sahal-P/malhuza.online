import { Form } from ".";
import useRegister from "@/hooks/useRegister";
import LoginWith from "./LoginWith";

export default function RegisterForm() {
  const { username, email, password, confirm_password, isLoading, onChange, onSubmit } = useRegister();
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
      labelId: "password",
      type: "password",
      value: password,
      required: true,
      link: true,
    },
    {
      labelText: "Confirm password",
      labelId: "confirm_password",
      type: "confirm_password",
      value: confirm_password,
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
