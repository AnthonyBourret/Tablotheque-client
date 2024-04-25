import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCookies } from "react-cookie";
import * as EmailValidator from 'email-validator';
import { axiosInstance } from "../../utils";
import { useToastDisplay } from "../../hooks";

// Import Components
import { InputTextSignup, Toast } from '../CustomComponents';

// Import SVG
import { Logo } from '../../svg';


function Signup() {

  const [, setCookie] = useCookies(['userInfo']);

  // States
  const [isCGUAccepted, setIsCGUAccepted] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string>('');

  async function handleSignup(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    // Check if all the required fields are filled
    if (data.username === '' || data.mail === '' || data.password === '' || data.confirmedPassword === '') {
      setToastMessage('Please fill all the required fields');
      setIsVisible(true);
      return;
    };
    // Check if the email is valid
    if (!EmailValidator.validate(formData.get('mail') as string)) {
      setToastMessage('Please enter a valid email');
      setIsVisible(true);
      return;
    };
    // Check if the two passwords are the same
    if (data.password !== data.passwordConfirm) {
      setToastMessage('Passwords do not match');
      setIsVisible(true);
      return;
    };
    // Check if the CGU are accepted
    if (!isCGUAccepted) {
      setToastMessage('Please accept the CGU');
      setIsVisible(true);
      return;
    };
    const res = await axiosInstance.post('/signup', data);
    if (res.status === 200) {
      setCookie('userInfo', res.data, { path: '/' });
      setToastMessage('Account created !');
      setIsVisible(true);
    } else {
      setToastMessage('An error occured, please try again');
      setIsVisible(true);
      return;
    };
  };

  // UseEffect to remove the Toast after 4 seconds
  useToastDisplay(isVisible, setIsVisible);

  return (
    <div className="w-full flex flex-col gap-2 items-center bg-base-300 justify-center px-6">

      {/* Logo */}
      <div className="flex justify-center">
        <Logo widthValue={"80%"} color={"#201c1b"} />
      </div>

      <div className="flex flex-col bg-base-100 items-center p-8 py-4 rounded-box border border-primary min-[820px]:w-2/5 lg:w-1/3 shadow-xl">
        <div className="text-xl font-semibold mb-6 text-center">Welcome on My Guitar Tabs !</div>
        {/* Signup Form */}
        <form
          onSubmit={handleSignup}
          className="flex flex-col gap-4 min-[820px]:w-2/3 items-center"
        >
          <InputTextSignup
            label="Username :"
            type={'text'}
            inputName="username"
          />
          <InputTextSignup
            label="Email :"
            type={'email'}
            inputName="mail"
          />
          <InputTextSignup
            label="Password :"
            type={'password'}
            inputName="password"
          />
          <InputTextSignup
            label="Confirm Password :"
            type={'password'}
            inputName="passwordConfirm"
          />

          {/* Accept CGU Checkbox*/}
          <div className="form-control sm:self-center">
            <label className="cursor-pointer label">
              <span className="label-text font-semibold mr-4">Accept CGU</span>
              <input
                type="checkbox"
                className="checkbox checkbox-sm"
                onChange={(e) => setIsCGUAccepted(e.target.checked ? true : false)}
              />
            </label>
          </div>

          {/* Login Button */}
          <button
            className="btn btn-primary px-4 text-base my-2 border border-base-200"
            type="submit"
          >
            Signup
          </button>
        </form>
        <div className="flex flex-col items-center text-sm my-2">
          <p className="text-center">
            Already have an account ?
            {' '}
          </p>
          <Link to="/" className="link link-info">
            Log in here !
          </Link>
        </div>
      </div>

      {/* Legal Mentions Link*/}
      <div>
        <Link to="/legal-mentions" className="link link-info text-xs">
          Legal Mentions
        </Link>
        <Link to="/privacy-policy" className="link link-info text-xs ml-4">
          Privacy Policy
        </Link>
      </div>

      {/* Toast */}
      {isVisible && <Toast message={toastMessage} />}
    </div>
  );
};

export default Signup;