import { FC } from "react";
import { Link } from "react-router-dom";

interface AuthLayoutProps {
    type: 'login' | 'register'
    children: React.ReactNode
}

const AuthLayout: FC<AuthLayoutProps> = ({children, type}) => {
  return (
    <div className="flex items-center min-h-screen p-4 bg-gray-100 dark:bg-document_bg lg:justify-center auth_container font-robotom">
      <div className="flex flex-col overflow-hidden bg-white dark:bg-sidebar rounded-md shadow-lg max md:flex-row md:flex-1 lg:max-w-screen-md">
        <div className="p-4 py-6 text-black dark:text-white  md:w-80 md:flex-shrink-0 md:flex md:flex-col md:items-center md:justify-evenly">
          <div className="my-3 text-4xl font-bold tracking-wider text-center">
            <a href="#">Notes</a>
          </div>
          <p className="mt-6 font-normal text-center text-gray-400 dark:text-gray-300 md:mt-0">
            Your Ideas, Documents, & Plans. Unified. Welcome to Notes by sahal
            Notes is connected workspace where better, faster, work happens.
          </p>
          <p className="flex flex-col items-center justify-center mt-10 text-center">
          <span>{type === 'login' &&  `Don't have an account?`}{type === 'register' &&  `Already have an account?`}</span>
            <a href={`/${type === 'login' ?  'sign-up' : 'sign-in'}`} className="underline">
              Get Started!
            </a>
          </p>
          <p className="mt-6 text-sm text-center text-gray-400 dark:text-gray-300">
            Read our{" "}
            <Link to="/Terms&Conditions" className="underline">
              terms & conditions
            </Link>
          </p>
        </div>
        <div className="p-5 bg-white dark:bg-secondary md:flex-1">
          <h3 className="my-4 text-center text-2xl font-semibold text-gray-700 dark:text-gray-200">
          Account{type === 'login' &&  ' Login'} {type === 'register' &&  ' Register'} 
          </h3>
          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
