import React, { useContext } from "react";
import NavLogo from "../components/NavLogo.png";
import { Link } from "react-router-dom";
import AuthContext from "../store/authContext";
import { Disclosure } from "@headlessui/react";
import { MenuIcon, XIcon } from "@heroicons/react/outline";
import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";

const Navbar = (props) => {
  const authCtx = useContext(AuthContext);
  let userInfo = JSON.parse(localStorage.getItem("userInfo"));
  if (userInfo === undefined || userInfo === null) {
    userInfo = { userName: "null", email: "null" };
  }
  const navigation = [
    { name: "Home", to: "/", current: true },
    { name: "Team", to: "/teamPage", current: false },
    { name: "Add Friends", to: "/addfriend", current: false },
  ];

  const unAuthorized = [
    <div>
      <Link to="/registerPage">
        <button className="inline-flex items-center px-3 py-2 border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-blue-700 rounded-md hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
          Sign Up
        </button>
      </Link>
      &nbsp;
      <Link to="/loginPage">
        <button className="inline-flex items-center px-3 py-2 border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-blue-700 rounded-md hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
          Login
          {props.userName}
        </button>
      </Link>
    </div>,
  ];

  const authorized = [
    <div className="flex">
      <Link to="/createPoll">
        <button className=" px-2 py-1 border-transparent text-base font-medium rounded-md text-white bg-blue-700 hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
          Create Poll
        </button>
      </Link>

      <div className=" inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
        <Menu as="div" className="ml-3 relative">
          <div>
            <Menu.Button className="bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
              <span className="sr-only">Open user menu</span>
              <img
                className="h-8 w-8 rounded-full"
                src="https://w7.pngwing.com/pngs/247/564/png-transparent-computer-icons-user-profile-user-avatar-blue-heroes-electric-blue.png"
                alt=""
              />
            </Menu.Button>
          </div>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
              <Menu.Item>
                <div
                  className={
                    " hover:bg-gray-200 block px-4 py-2 text-sm text-gray-700"
                  }
                >
                  {userInfo.userName}
                </div>
              </Menu.Item>
              <Menu.Item>
                <Link to="/">
                  <div
                    onClick={() => {
                      authCtx.onLogout();
                    }}
                    className="hover:bg-gray-200 block px-4 py-2 text-sm text-gray-700 hover:text-red-500"
                  >
                    Logout
                  </div>
                </Link>
              </Menu.Item>
            </Menu.Items>
          </Transition>
        </Menu>
      </div>
    </div>,
  ];
  return (
    <Disclosure as="nav" className="bg-white border-b">
      {({ open }) => (
        <>
          <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
            <div className="relative flex items-center justify-between h-16">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-black-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex-shrink-0 flex items-center">
                  <img
                    className="block lg:hidden h-8 w-auto ml-24"
                    src={NavLogo}
                    alt="SchedulEasy"
                  />
                  <img
                    className="hidden lg:block h-8 w-auto"
                    src={NavLogo}
                    alt="SchedulEasy"
                  />
                </div>
                <div className="hidden sm:block sm:ml-6">
                  <div className="flex space-x-4">
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        to={item.to}
                        className={
                          "text-black-300 hover:bg-gray-400 hover:text-white px-3 py-2 rounded-md text-base font-medium"
                        }
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex my-2.5">
                {!authCtx.isLoggedIn && unAuthorized}
                {authCtx.isLoggedIn && authorized}
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  as="a"
                  to={item.to}
                  className={
                    "bg-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                  }
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};

export default Navbar;
