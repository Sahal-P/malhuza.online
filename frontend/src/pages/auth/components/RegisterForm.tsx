import { Form } from ".";
import useRegister from "@/hooks/useRegister";
import LoginWith from "./LoginWith";

export default function RegisterForm() {
  const {
    onSubmit,
  } = useRegister();

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
