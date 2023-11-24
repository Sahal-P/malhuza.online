import { RegisterForm } from "@/components/forms";
import { FC } from "react";

interface RegisterProps {}

const Register: FC<RegisterProps> = () => {
  return (
    <>
      <div className="flex items-center min-h-screen p-4 bg-gray-100 lg:justify-center auth_container">
        <div className="flex flex-col overflow-hidden bg-white rounded-md shadow-lg max md:flex-row md:flex-1 lg:max-w-screen-md">
          <div className="p-4 py-6 text-white bg-blue-500 md:w-80 md:flex-shrink-0 md:flex md:flex-col md:items-center md:justify-evenly">
            <div className="my-3 text-4xl font-bold tracking-wider text-center">
              <a href="#">K-WD</a>
            </div>
            <p className="mt-6 font-normal text-center text-gray-300 md:mt-0">
              With the power of K-WD, you can now focus only on functionaries
              htmlFor your digital products, while leaving the UI design on us!
            </p>
            <p className="flex flex-col items-center justify-center mt-10 text-center">
              <span>Already have an account?</span>
              <a href="/sign-in/" className="underline">
                Login Here!
              </a>
            </p>
            <p className="mt-6 text-sm text-center text-gray-300">
              Read our{" "}
              <a href="#" className="underline">
                terms
              </a>{" "}
              and{" "}
              <a href="#" className="underline">
                conditions
              </a>
            </p>
          </div>
          <div className="p-5 bg-white md:flex-1">
            <h3 className="my-4 text-center text-2xl font-semibold text-gray-700">
              Account register
            </h3>
            <RegisterForm />
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
