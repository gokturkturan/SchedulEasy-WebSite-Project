import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../App.css";
import { LockClosedIcon } from "@heroicons/react/solid";
import logo from "../components/Logo.png";
import {
  signInWithPopup,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithRedirect,
  getRedirectResult,
} from "firebase/auth";
import { auth, provider } from "../database/firebase-config";
import AuthContext from "../store/authContext";
import { DatabaseHandler } from "../database/DatabaseHandler";
import Alert from "../UI/Alert";
import RedirectinBanner from "../UI/RedirectingBanner";

const initialError = {
  isError: false,
  errorCode: "",
  errorMessages: [],
};

export default function SignInPage(props) {
  const [inputs, setInputs] = useState({});
  const [error, setError] = useState(initialError);
  const [redirecting, setRedirecting] = useState(true);

  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(()=>{
    getRedirectResult(auth)
        .then((result) => {
          const credential = GoogleAuthProvider.credentialFromResult(result);
          const token = credential.accessToken;
          const user = result.user;
               localStorage.setItem("uid", user.uid);
        localStorage.setItem(
          "userInfo",
          JSON.stringify({
            email: user.email,
            userName: user.displayName,
          })
        );
        DatabaseHandler.registerUserData(
          user.uid,
          user.displayName,
          user.email,
          "null",
          "null"
        );
        authCtx.onLogin();
        navigate("/");
        setRedirecting(false)
        })
        .catch((e) => {
          setRedirecting(false);
          const errorCode = error.code;
          const errorMessage = error.message;
          // The email of the user's account used.
          const email = error.customData.email;
          // The AuthCredential type that was used.
          const credential = GoogleAuthProvider.credentialFromError(error);
          setError((error) => ({
            isError: true,
            errorCode: errorCode,
            errorMessages: [...error.errorMessages, errorMessage],
          }));
        });
  },[])

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(inputs);
    signInWithEmailAndPassword(auth, inputs.email, inputs.password)
      .then(async (userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
        const userName = await DatabaseHandler.getUserName(user.uid); // Critical ! I should look again. undefined
        console.log(userName);
        localStorage.setItem("uid", user.uid);
        localStorage.setItem(
          "userInfo",
          JSON.stringify({ email: user.email, userName: userName })
        );
        authCtx.onLogin();

        navigate("/");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;

        setError((error) => ({
          isError: true,
          errorCode: errorCode,
          errorMessages: [...error.errorMessages, errorMessage],
        }));
        console.log(errorCode, errorMessage);
      });
  };

  const googleHandler = () => {
    //signInWithRedirect(auth, provider);
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;
        console.log(user, user.uid);
        localStorage.setItem("uid", user.uid);
        localStorage.setItem(
          "userInfo",
          JSON.stringify({
            email: user.email,
            userName: user.displayName,
          })
        );
        DatabaseHandler.registerUserData(
          user.uid,
          user.displayName,
          user.email,
          "null",
          "null"
        );
        authCtx.onLogin();
        navigate("/");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
        console.log(errorCode, errorMessage, email, credential);
      });
  };

  return (
    <>
      {redirecting && <RedirectinBanner/>}
      <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <img className="mx-auto h-50 w-72" src={logo} alt="logo" />
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Sign in to your account
            </h2>
          </div>
          <form
            className="mt-8 space-y-6"
            action="/home"
            onSubmit={handleSubmit}
          >
            <div className="rounded-md shadow-sm -space-y-px">
              <div className="flex">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 15"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                <label className="sr-only">Email address</label>
                <input
                  type="text"
                  name="email"
                  value={inputs.email}
                  onChange={handleChange}
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Email address"
                />
              </div>
              <div className="flex">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 18"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"
                  />
                </svg>
                <label className="sr-only">Password</label>
                <input
                  type="password"
                  name="password"
                  value={inputs.password || ""}
                  onChange={handleChange}
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Password"
                />
              </div>
            </div>
            {error.isError && (
              <Alert
                title={error.errorCode}
                status="err"
                messages={error.errorMessages}
              />
            )}
            <div className="flex items-center justify-between">
              <div className="flex items-center"></div>
              <div className="text-sm">
                <Link to="/forget-password">
                  <label className="font-medium text-blue-700 hover:text-blue-500">
                    Forgot password?
                  </label>
                </Link>
              </div>
            </div>

            <div>
              <button
                id="sub_btn"
                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-base font-medium rounded-md text-white bg-blue-700 hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                type="submit"
              >
                <span className="absolute left-0 inset-y-0 flex items-center pl-5">
                  <LockClosedIcon
                    className="h-7 w-7 text-blue-500 group-hover:text-blue-700"
                    aria-hidden="true"
                  />
                </span>
                Sign in
              </button>
              <br />
              <button
                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-base font-medium rounded-md text-white bg-blue-700 hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                type="button"
                onClick={googleHandler}
              >
                <span className="absolute left-0 inset-y-0 flex items-center pl-5">
                  <img
                    src="https://img.icons8.com/ios-filled/30/000000/google-logo.png"
                    alt="google icon"
                  />
                </span>
                Continue with Google
              </button>
              <br />
              <div className="text-center text-1xl  text-gray-900">
                Don't have an account yet? &nbsp;
                <Link
                  to="/registerPage"
                  className="font-medium text-blue-700 hover:text-blue-500"
                >
                  Sign up
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
