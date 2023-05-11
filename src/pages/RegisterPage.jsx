import React, { Fragment, useContext } from "react";
import { useState } from "react";
import { auth } from "../database/firebase-config";
import { createUserWithEmailAndPassword } from "firebase/auth";
import logo from "../components/Logo.png";
import "../App.css";
import Alert from "../UI/Alert";
import { useNavigate } from "react-router-dom";
import { DatabaseHandler } from "../database/DatabaseHandler";
import AuthContext from "../store/authContext";
import Modal from "../UI/Modal";

export default function SignUpPage() {
  const [inputs, setInputs] = useState({});
  const [error, setError] = useState({ isError: false });
  const [registered, setRegistered] = useState(false);
  const navigate = useNavigate();
  const authCtx = useContext(AuthContext);

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };
  const validateInput = (event) => {
    let { name, value } = event.target;

    switch (name) {
      case "userName":
        if (!value) {
          setError({ isError: true, errorMessage: "Please enter username" });
        }
        break;
      case "email":
        if (!value) {
          setError({ isError: true, errorMessage: "Please enter email" });
        }
        break;
      case "birthDate":
        if (!value) {
          setError({ isError: true, errorMessage: "Please enter birthdate" });
        }
        break;
      case "password":
        if (!value) {
          setError({ isError: true, errorMessage: "Please enter password" });
        } else if (
          inputs.confirmPassword &&
          value !== inputs.confirm_password
        ) {
          setError({
            isError: true,
            errorMessage: "Password and Confirm Password does not match.",
          });
        }
        break;

      case "confirm_password":
        if (!value) {
          setError({
            isError: true,
            errorMessage: "Password and Confirm Password does not match.",
          });
        } else if (inputs.password && value !== inputs.password) {
          setError({
            isError: true,
            errorMessage: "Password and Confirm Password does not match.",
          });
        }
        break;

      default:
        break;
    }
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const { email, userName, majority, birthDate } = inputs;
    console.log(email, userName, majority, birthDate);

    createUserWithEmailAndPassword(auth, inputs.email, inputs.password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(userCredential, user);
        DatabaseHandler.registerUserData(
          user.uid,
          userName,
          email,
          birthDate,
          majority
        );
        setRegistered(true);
        localStorage.setItem("uid", user.uid);
        localStorage.setItem(
          "userInfo",
          JSON.stringify({ email: email, userName: userName })
        );
        authCtx.onLogin(user.uid);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage);
        setError({
          isError: true,
          errorMessage: errorMessage,
          errorCode: errorCode,
        });
      });

    console.log(inputs);
  };
  return (
    <Fragment>
      <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <img className="mx-auto h-50 w-72" src={logo} alt="logo" />
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Sign up to SchedulEasy
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
                  viewBox="0 0 24 18"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
                <label className="sr-only">Username</label>
                <input
                  type="text"
                  name="userName"
                  value={inputs.userName}
                  onChange={handleChange}
                  onBlur={validateInput}
                  required
                  className="appearance-none rounded-none rounded-t-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Username"
                />
              </div>
              {error.userName && <span className="err">{error.userName}</span>}
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
                    d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                  />
                </svg>
                <label className="sr-only">Email address</label>
                <input
                  type="email"
                  name="email"
                  value={inputs.email || ""}
                  onChange={handleChange}
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
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
                  onBlur={validateInput}
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Password"
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
                  name="confirm_password"
                  value={inputs.confirm_password || ""}
                  onChange={handleChange}
                  onBlur={validateInput}
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Password Again"
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
                    d="M21 15.546c-.523 0-1.046.151-1.5.454a2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.701 2.701 0 00-1.5-.454M9 6v2m3-2v2m3-2v2M9 3h.01M12 3h.01M15 3h.01M21 21v-7a2 2 0 00-2-2H5a2 2 0 00-2 2v7h18zm-3-9v-2a2 2 0 00-2-2H8a2 2 0 00-2 2v2h12z"
                  />
                </svg>
                <label className="sr-only">Date of Birth</label>
                <input
                  type="date"
                  name="birthDate"
                  value={inputs.birthDate || ""}
                  onChange={handleChange}
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Date of birth"
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
                  <path d="M12 14l9-5-9-5-9 5 9 5z" />
                  <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
                  />
                </svg>
                <label className="sr-only">Majority</label>
                <input
                  type="text"
                  name="majority"
                  onChange={handleChange}
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 rounded-b-md placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Majority"
                />
              </div>
            </div>
            &nbsp;
            <input type="checkbox" name="checkbox" id="checkbox" required />
            &nbsp;
            <span>I agree all statements in terms of service</span>.
            <div>
              <button
                id="sub_btn"
                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-base font-medium rounded-md text-white bg-blue-700 hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                type="submit"
              >
                <span className="absolute left-0 inset-y-0 flex items-center pl-5"></span>
                Sign up
              </button>
            </div>
          </form>
          <footer></footer>
          {registered && (
            <Modal
              route="/"
              routePageMessage={"Go to Home Page !"}
              title={`Welcome ${inputs.userName}!`}
              message={"You have registered Successfully !"}
            />
          )}
          {error.isError && (
            <Alert
              messages={[error.errorMessage]}
              title={error.errorCode}
              status={"err"}
            />
          )}
        </div>
      </div>
    </Fragment>
  );
}
