import { set } from "firebase/database";
import React, { useEffect, useState } from "react";
import { SocialHandler } from "../database/SocialHandler";
import Alert from "../UI/Alert";
import Banner from "../UI/Banner";
import FriendList from "../UI/FriendList";

const Addfriend = () => {
  const [isError, setError] = useState(false);
  const [isFriend, setFriend] = useState(true);
  const [isUser, setUser] = useState(true);
  const [isUserSelf, setIsUserisUserSelf] = useState(false);
  const [enteredUsername, setEnteredUsername] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [requests, setRequests] = useState([]);
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  const usernameChangeHandler = (event) => {
    setEnteredUsername(event.target.value);
  };

  /*const sendRequest = () => {};*/

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    var res = await SocialHandler.getUsername(enteredUsername);
    //console.log(res);
    setIsLoading(false);
    if (res != null) {
      setUser(true);
      var getFriend = await SocialHandler.getFriend(
        enteredUsername,
        userInfo["userName"]
      );
      console.log("get", getFriend);
      if (getFriend != null) {
        console.log("You are already friends");
        setFriend(true);
        setError(true);
      } else {
        console.log("Request Sent");
        if (enteredUsername !== userInfo["userName"]) {
          SocialHandler.sendFriendRequest(
            userInfo["userName"],
            enteredUsername
          );
          setFriend(false);
        } else {
          setIsUserisUserSelf(true);
        }
      }
    } else {
      console.log("There is no such user.");
      setError(true);
      setUser(false);
      setFriend(false);
    }

    event.target.value = " ";
  };

  return (
    <>
      <form
        className="sm:w-full md:w-1/2  md:mx-auto space-y-8 divide-y divide-gray-200 sm:space-y-5 divide-gray-200 mr-20 ml-20 mt-36"
        onSubmit={handleSubmit}
      >
        <div className="space-y-8 divide-y divide-gray-200">
          <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
            <div className="sm:col-span-6">
              <label
                htmlFor="Add Friend"
                className="block text-sm font-medium text-gray-700"
              >
                Add Friend
              </label>
              <div className="mt-1 flex rounded-md shadow-sm">
                <input
                  type="text"
                  name="title"
                  id="title"
                  required
                  value={enteredUsername}
                  onChange={usernameChangeHandler}
                  className="flex-1 focus:ring-indigo-500 border focus:border-indigo-500 block w-full h-8 min-w-0 rounded-md sm:text-sm border-gray-300"
                />
              </div>
            </div>
          </div>
          <div className="pt-2">
            <div className="flex justify-end">
              {isLoading ? (
                <Banner message={"Wait a second..."} />
              ) : (
                <button
                  type="submit"
                  className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-700 hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Send Request
                </button>
              )}
            </div>
          </div>
          {!isLoading && isError && isFriend && (
            <Alert
              title="Error"
              messages={[`You are already friends with ${enteredUsername}`]}
              status={"err"}
            />
          )}
          {!isFriend && !isLoading && isUser && (
            <Alert
              title="Friendship"
              messages={["Friendship request sent"]}
              status={"succ"}
            />
          )}
          {!isLoading && isError && !isUser && (
            <Alert
              title="Error"
              messages={["There is no such user"]}
              status={"err"}
            />
          )}
          {!isLoading && isUserSelf && isUser && (
            <Alert title="Error" messages={["This is you."]} status={"err"} />
          )}
        </div>
      </form>
      <div className="sm:w-full md:w-1/2  md:mx-auto space-y-8 divide-y divide-gray-200 sm:space-y-5 divide-gray-200 mr-20 ml-20 mt-10">
        <label></label>
        <FriendList username={userInfo["userName"]}></FriendList>
      </div>
    </>
  );
};
export default Addfriend;
