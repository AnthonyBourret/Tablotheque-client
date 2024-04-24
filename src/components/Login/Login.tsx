import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCookies } from "react-cookie";

// Import Components
import { InputTextAuth, Toast } from '../CustomComponents';

// Import Hook
import useToastDisplay from "../../hooks/useToastDisplay";

// Import SVG
import Logo from '../../svg/Logo';

// Import Function
import handleLogin from "../../utils/handleLogin";


function Login() {

  const [cookies, setCookie, removeCookie] = useCookies(['userInfo']);

  // States
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  // Function to handle the Enter key
  async function handleKey(e: React.KeyboardEvent) {
    if (e.key === 'Enter') {
      await handleLogin(
        username,
        password,
        setCookie as (name: string, value: any, options?: any) => void, // Update the type of setCookie
        setIsVisible,
        setToastMessage
      );
    };
  };

  // UseEffect to remove the Toast after 4 seconds
  useToastDisplay(isVisible, setIsVisible);

  return (
    <div className="w-full flex flex-col gap-4 pt-2 items-center bg-base-300 justify-center px-6">

      {/* Logo */}
      <div>
        <Logo widthValue={"100%"} color={"#201c1b"} />
      </div>

      <div className="flex flex-col bg-base-100 items-center p-8 rounded-box border border-primary sm:px-20 sm:w-fit shadow-xl">
        <div className="flex flex-col gap-6 items-center">

          {/* Username Input */}
          <InputTextAuth
            label="Username :"
            type={'text'}
            setterFunction={setUsername}
            handleKey={handleKey}
          />

          {/* Password Input */}
          <InputTextAuth
            label="Password :"
            type={'password'}
            setterFunction={setPassword}
            handleKey={handleKey}
          />

          {/* Login Button */}
          <button
            type="submit"
            className="btn btn-primary my-2 px-4 text-base border border-base-200"
            onClick={() => handleLogin(
              username,
              password,
              setCookie as (name: string, value: any, options?: any) => void, // Update the type of setCookie
              setIsVisible,
              setToastMessage
            )}
          >
            Login
          </button>

          {/* Signup Link */}
          <div className="flex flex-col items-center text-sm">
            <p className="text-center">
              Don't have an account ?
              {' '}
            </p>
            <Link to="/signup" className="link link-info">
              Click here !
            </Link>
          </div>
        </div>
      </div>

      {/* Legal Mentions Link */}
      <div className="mt-8">
        <Link to="/legal-mentions" className="link link-info text-xs">
          Legal Mentions
        </Link>
        <Link to="/privacy-policy" className="link link-info text-xs ml-4">
          Privacy Policy
        </Link>
      </div>

      {/* Toast with error message */}
      {isVisible && <Toast message={toastMessage} />}
    </div>
  );
};

export default Login;