import Form from "./Form";
import useLogin from "@/hooks/useLogin";
import LoginWith from "./LoginWith";


export default function LoginForm() {
  const { email, password, isLoading, onChange, onSubmit } = useLogin();
  const config = [
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
      link: true
    },
  ];
  return (
    <>
      <Form
        config={config}
        isLoading={isLoading}
        btnTxt="Log in"
        onChange={onChange}
        onSubmit={onSubmit}
        LoginWith={LoginWith}
      ></Form>
    </>
  );
}
