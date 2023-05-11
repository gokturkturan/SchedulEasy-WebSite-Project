import { CheckIcon, XIcon } from "@heroicons/react/solid";
import { Fragment, useEffect, useState } from "react";
import { SocialHandler } from "../database/SocialHandler";
import Banner from "./Banner";
import EmptyFriend from "./EmptyFriend";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function FriendList({ username }) {
  const [requests, setRequests] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [empty, setEmpty] = useState(requests.length == 0);
  const removePerson = (personIndex) => {
    setRequests(requests.splice(personIndex, personIndex));
  };
  useEffect(async () => {
    var res = await SocialHandler.getFriendRequests(username);
    if (res != null) {
      var keys = Object.keys(res);
      setRequests(keys);
      setEmpty(false);
    } else {
      setEmpty(true);
    }
    setIsLoading(false);
  }, []);
  return (
    <Fragment>
      {isLoading ? (
        <Banner message={"Recieving friend requests..."} />
      ) : empty ? (
        <EmptyFriend />
      ) : (
        <div className="px-4 sm:px-6 lg:px-8 -ml-10">
          <div className="sm:flex sm:items-center">
            <div className="sm:flex-auto">
              <h1 className="text-xl font-semibold text-gray-900">
                Friend Requests
              </h1>
              <p className="mt-2 text-sm text-gray-700">
                List of all friend requests.
              </p>
            </div>
            <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none"></div>
          </div>
          <div className="mt-8 flex flex-col">
            <div className="-my-2 -mx-4 sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-5 py-2 align-middle">
                <div className="shadow-sm ring-1 ring-black ring-opacity-5">
                  <table
                    className="min-w-5 border-separate"
                    style={{ borderSpacing: 20 }}
                  >
                    <thead className="bg-gray-50">
                      <tr>
                        <th
                          scope="col"
                          className="flex justify-center sticky top-0 z-10 border-b border-gray-300 bg-gray-50 bg-opacity-75 py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter sm:pl-6 lg:pl-8"
                        >
                          Name
                        </th>

                        <th
                          scope="col"
                          className="sticky top-0 z-10 border-b border-gray-300 bg-gray-50 bg-opacity-75 px-3 py-3.5 text-left text-sm font-semibold text-green-900 backdrop-blur backdrop-filter lg:table-cell"
                        >
                          Accept
                        </th>
                        <th
                          scope="col"
                          className="sticky top-0 z-10 border-b border-gray-300 bg-gray-50 bg-opacity-75 px-3 py-3.5 text-left text-sm font-semibold text-red-900 backdrop-blur backdrop-filter"
                        >
                          Refuse
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white">
                      {requests.map((person, personIdx) => (
                        <tr key={personIdx}>
                          <td
                            className={classNames(
                              personIdx !== requests.length - 1
                                ? "border-b border-gray-200"
                                : "",
                              "whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 lg:pl-8"
                            )}
                          >
                            {person}
                          </td>
                          <td
                            className={classNames(
                              personIdx !== requests.length - 1
                                ? "border-b border-gray-200"
                                : "",
                              "whitespace-nowrap px-3 py-4 text-sm text-gray-500 sm:table-cell"
                            )}
                          >
                            <button
                              className="flex items-center"
                              onClick={() => {
                                SocialHandler.acceptFriend(username, person);
                                removePerson(personIdx);
                              }}
                            >
                              <CheckIcon
                                className="w-7 h-7 text-gray-400 hover:text-green-500"
                                aria-hidden="true"
                              />
                            </button>
                          </td>
                          <td
                            className={classNames(
                              personIdx !== requests.length - 1
                                ? "border-b border-gray-200"
                                : "",
                              "whitespace-nowrap px-3 py-4 text-sm text-gray-500 lg:table-cell"
                            )}
                          >
                            <button
                              className="flex items-center"
                              onClick={() => {
                                SocialHandler.removeFriendRequest(
                                  username,
                                  person
                                );
                                removePerson(personIdx);
                              }}
                            >
                              <XIcon
                                className="w-7 h-7 text-gray-400 hover:text-red-500"
                                aria-hidden="true"
                              />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
}
