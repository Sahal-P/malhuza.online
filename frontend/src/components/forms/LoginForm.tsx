import Form from "./Form";
import useLogin from "@/hooks/useLogin";
import LoginWith from "./LoginWith";


export default function LoginForm() {
  const { onSubmit } = useLogin();

  return (
    <>
      <Form
        isLoading={false}
        onSubmit={onSubmit}
        LoginWith={LoginWith}
      ></Form>
    </>
  );
}
