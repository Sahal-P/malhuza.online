import LoginForm from "./components/LoginForm";
import AuthLayout from "@/pages/auth/components/AuthLayout";

const Login = () => {
  return (
    <AuthLayout type="login">
      <LoginForm />
    </AuthLayout>
  );
};

export default Login;
