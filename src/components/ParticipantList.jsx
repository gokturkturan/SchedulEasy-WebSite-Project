import { Fragment, useState } from "react";
import { Menu, Transition } from "@headlessui/react";
import {
  ChevronDownIcon,
  QuestionMarkCircleIcon,
} from "@heroicons/react/solid";

export default function ParticipantList({
  userName,
  comings,
  Ncomings,
  ifNeed,
}) {
  const icons = {
    coming: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-5 w-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="green"
        stroke-width="2"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
    not: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-5 w-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="red"
        stroke-width="2"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
    if: <QuestionMarkCircleIcon className="w-5 h-5 text-orange-400" />,
  };

  const [selected, setSelected] = useState(
    comings.includes(userName)
      ? "Coming"
      : Ncomings.includes(userName)
      ? "Not"
      : ifNeed.includes(userName)
      ? "If"
      : "Coming"
  );
  return (
    <div>
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500">
            {selected === "Coming" && (
              <div className="flex items-center space-x-3">
                {icons["coming"]}
                Coming List
              </div>
            )}

            {selected === "Not" && (
              <div className="flex items-center space-x-3">
                {icons["not"]}
                Not Coming List
              </div>
            )}
            {selected === "If" && (
              <div className="flex items-center space-x-3">
                {icons["if"]}
                If Need Be List
              </div>
            )}
            <ChevronDownIcon
              className="-mr-1 ml-2 h-5 w-5"
              aria-hidden="true"
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
          <Menu.Items className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="py-1">
              {selected !== "Not" && (
                <Menu.Item
                  onClick={() => {
                    setSelected("Not");
                  }}
                >
                  <div className="flex items-center space-x-3 text-gray-900">
                    {icons["not"]}Not Coming List
                  </div>
                </Menu.Item>
              )}
              {selected !== "If" && (
                <Menu.Item
                  onClick={() => {
                    setSelected("If");
                  }}
                >
                  <div className="flex items-center space-x-3 text-gray-900">
                    {icons["if"]}If need be List
                  </div>
                </Menu.Item>
              )}
              {selected !== "Coming" && (
                <Menu.Item
                  onClick={() => {
                    setSelected("Coming");
                  }}
                >
                  <div className="flex items-center space-x-3 text-gray-900">
                    {icons["coming"]}Coming List
                  </div>
                </Menu.Item>
              )}
            </div>
          </Menu.Items>
        </Transition>
        <ul className="h-20 border border-transparent rounded-md overflow-y-scroll">
          {selected === "Coming" &&
            comings.map((user, index) => <li key={index}>{user}</li>)}
          {selected === "Not" &&
            Ncomings.map((user, index) => <li key={index}>{user}</li>)}
          {selected === "If" &&
            ifNeed.map((user, index) => <li key={index}>{user}</li>)}
        </ul>
      </Menu>
    </div>
  );
}
