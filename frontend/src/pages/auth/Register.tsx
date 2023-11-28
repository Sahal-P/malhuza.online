import  RegisterForm  from "@/pages/auth/components/RegisterForm";
import AuthLayout from "@/pages/auth/components/AuthLayout";

const Register = () => {
  return (
    <AuthLayout type="register">
      <RegisterForm />
    </AuthLayout>
  );
};

export default Register;
