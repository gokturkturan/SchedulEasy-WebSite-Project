import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SelectHour from "./SelectHour";
import DateOptionCard from "../components/DateOptionCard";
import { DatabaseHandler } from "../database/DatabaseHandler";
import Notify from "../UI/Modal";
import Alert from "../UI/Alert";
import { SocialHandler } from "../database/SocialHandler";
import FriendLists from "../UI/FriendLists";

const CreatePoll = () => {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  const navigate = useNavigate();
  const [options, setOptions] = useState([]);
  const [friends, setFriends] = useState([]);
  const [isOptionEmpty, setIsOptionEmpty] = useState(true);
  const [isOptionEmptyError, setIsOptionEmptyError] = useState(false);
  const [isOptionDateError, setIsOptionDateError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [textParticipant, setTextParticipant] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [showMessage, setShowMessage] = useState(false);


  const[optError,setOptError] = useState(false);
  const[optHoursError,setOptHoursError] = useState(false);
  var err = false;
  useEffect(async ()=>{
    console.log(userInfo["userName"]);
    var res = await SocialHandler.getFriends(userInfo["userName"]);
    
    setFriends(res);
    setIsLoading(false);
  },[])


  let counter = 0; // might think different way later...

  const [enteredTitle, setEnteredTitle] = useState("");
  const titleChangeHandler = (event) => {
    setEnteredTitle(event.target.value);
  };

  const [enteredDescription, setEnteredDescription] = useState("");
  const descriptionChangeHandler = (event) => {
    setEnteredDescription(event.target.value);
  };

  const [enteredStartDate, setEnteredStartDate] = useState();
  const startDateChangeHandler = (event) => {
    setEnteredStartDate(event.target.value);
    console.log(event.target.value)
    setIsOptionDateError(false);
  };
  const [enteredLocation, setEnteredLocation] = useState("");
  const LocationChangeHandler = (event) => {
    setEnteredLocation(event.target.value);
  };

  const focusHandler = () => {
    setIsFocused(true)
  }

  const addHandler = (friend) => {
    if(textParticipant[textParticipant.length - 1] != "," && textParticipant.length != 0){
      setTextParticipant((prev)=> prev+`,${friend},`)
    }else{
      setTextParticipant((prev)=> prev+`${friend},`)
    }
    
    
  }

  const addOptionHandler = () => {
    const sTime = localStorage.getItem("startTime");
    const eTime = localStorage.getItem("endTime");
    if (
      sTime === undefined ||
      eTime === undefined ||
      (enteredStartDate === undefined || enteredStartDate === "")
    ) {
      setIsOptionDateError(true);
    } else {
      let newOpt = { date: enteredStartDate, startTime: sTime, endTime: eTime };
      options.forEach((option) => {
        if((option["date"] === enteredStartDate && option["startTime"] === sTime && option["endTime"] === eTime)){
          err = true;
          setOptError(true)
        }
      })
      if(!(err)){

       if(sTime === eTime || sTime > eTime){
          setOptHoursError(true);
       }else{
        
        setOptions((values) => [...values, newOpt]);
        setIsOptionDateError(false);
        setIsOptionEmpty(false);
        setIsOptionEmptyError(false);
        setOptHoursError(false);
        setOptError(false);
       }
      }
      
      console.log(options);
    }
  };

  const [cb1, setCB1] = useState(false);
  const CB1ChangeHandler = (event) => {
    if (cb1 === false) {
      setCB1(true);
    } else {
      setCB1(false);
    }
  };

  const [enteredLimit, setEnteredLimit] = useState(0);
  const limitChangeHandler = (event) => {
    if (event.target.value === 0) {
    }
    setEnteredLimit(Number(event.target.value));
  };

  const [enteredParticipants, setEnteredParticipants] = useState({});
  const participantsChangeHandler = (event) => {
    let string = textParticipant;
    setTextParticipant(event.target.value)
    const array = string.split(",");
    array.splice(array.length - 1 ,array.length)
    setEnteredParticipants({ ...array });
  };

  const [cb2, setCB2] = useState(false);
  const CB2ChangeHandler = (event) => {
    if (cb2 === false) {
      setCB2(true);
    } else {
      setCB2(false);
      setEnteredLimit("");
    }
  };

  const [cb3, setCB3] = useState(false);
  const CB3ChangeHandler = (event) => {
    if (cb3 === false) {
      setCB3(true);
    } else {
      setCB3(false);
    }
  };

  const cancelCreate = () => {
    navigate("/");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (isOptionEmpty) {
      setIsOptionEmptyError(true);
    } else {
      var array = textParticipant.split(",");
      console.log(array.splice(array.length - 1,array.length))
      let poll = {
        creatorName: userInfo.userName,
        title: enteredTitle,
        description: enteredDescription,
        location: enteredLocation,
        checkBox1: cb1,
        isOpen: true,
        limit: enteredLimit,
        hideParticipants: cb3,
        participants: (array),
        options: options,
      };
      Object.keys(poll.options).forEach((key)=> poll.options[key]["creatorName"] = userInfo.userName)
      DatabaseHandler.createEvent(poll);
      setShowMessage(true);
    }
  };






  return (
    <div>
      <form
        className="sm:w-full md:w-1/2  md:mx-auto space-y-8 divide-y divide-gray-200 sm:space-y-5 divide-gray-200 mr-20 ml-20 mb-2"
        onSubmit={handleSubmit}
      >
        <h1 className="text-lg leading-6 text-xl text-gray-900 font-semibold mt-3">
          Create Group Poll
        </h1>
        <div className="space-y-8 divide-y divide-gray-200">
          <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
            <div className="sm:col-span-6">
              <label
                htmlFor="Title"
                className="block text-sm font-medium text-gray-700"
              >
                Title
              </label>
              <div className="mt-1 flex rounded-md shadow-sm">
                <input
                  type="text"
                  name="title"
                  id="title"
                  required
                  value={enteredTitle}
                  onChange={titleChangeHandler}
                  className="flex-1 focus:ring-indigo-500 border focus:border-indigo-500 block w-full h-8 min-w-0 rounded-md sm:text-sm border-gray-300"
                />
              </div>
            </div>

            <div className="sm:col-span-6">
              <label
                htmlFor="Description"
                className="block text-sm font-medium text-gray-700"
              >
                Description (optional)
              </label>
              <div className="mt-1">
                <textarea
                  id="Description"
                  name="Description"
                  rows={3}
                  value={enteredDescription}
                  onChange={descriptionChangeHandler}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border border-gray-300 rounded-md"
                />
              </div>
              <p className="mt-2 text-sm text-gray-500">
                Write a few sentences about event.
              </p>
            </div>

            <div className="sm:col-span-6">
              <label
                htmlFor="Title"
                className="block text-sm font-medium text-gray-700"
              >
                Location (optional)
              </label>
              <div className="mt-1 flex rounded-md shadow-sm">
                <input
                  type="text"
                  name="location"
                  id="location"
                  value={enteredLocation}
                  onChange={LocationChangeHandler}
                  className="flex-1 focus:ring-indigo-500 border h-8 focus:border-indigo-500 block w-full min-w-0 rounded-md sm:text-sm border-gray-300"
                />
              </div>
            </div>

            <div className="sm:col-span-6">
              <label
                htmlFor="Title"
                className="block text-sm font-medium text-gray-700"
              >
                Participants
              </label>
              <div className="mt-1 flex rounded-md shadow-sm">
                <input
                  type="text"
                  name="partcpnts"
                  onFocus={focusHandler}
                  value={textParticipant}
                  id="partcpnts"
                  onChange={participantsChangeHandler}
                  className="flex-1 focus:ring-indigo-500 border focus:border-indigo-500 block w-full h-8 min-w-0 rounded-md sm:text-sm border-gray-300"
                />
              </div>
              <div>
              { isFocused && <FriendLists isLoading={isLoading} friends={Object.keys(friends)} addHandler={addHandler} participants={textParticipant}/>}
              </div>
            </div>
          </div>
        </div>

        <div className="pt-8">
          <h1 className="text-lg leading-6 text-xl text-gray-900 font-semibold mb-2">
            Date and Hours
          </h1>
          <div className="sm:flex sm:flex-col md:grid md:grid-cols-3">
            <div className="col-span-1 sm:ml-0 md:ml-16">
              <label className="block text-sm font-medium text-gray-700 mr-2">
                Date:
              </label>
              <input
                type="date"
                name="startDate"
                value={enteredStartDate}
                onChange={startDateChangeHandler}
                className=" focus:ring-indigo-500 border focus:border-indigo-500 w-2/3 block h-8  rounded-md sm:text-sm border-gray-300"
                placeholder="startDate"
              />
            </div>
            <div className="col-span-1 sm:ml-0 md:ml-16">
              <label className="block text-sm font-medium text-gray-700">
                Start Time:
              </label>
              <SelectHour name="Start Time" keyy={"startTime"} />
            </div>
            <div className="col-span-1 sm:ml-0 md:ml-16">
              <label className="block text-sm font-medium text-gray-700">
                Finish Time:
              </label>
              <SelectHour name="Finish Time" keyy={"endTime"} />
            </div>
          </div>

          <div className="flex justify-center mt-4 ml-24">
            <button
              className="flex justify-center py-1 px-2 border border-transparent text-base font-medium rounded-md text-white bg-blue-700 hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              type="button"
              onClick={addOptionHandler}
            >
              Add Option
            </button>
          </div>
        </div>
        {!isOptionEmpty && <DateOptionCard options={options} />}
        {optError && <Alert title={"Opps!"} messages={["You can not add same option again"]}/>}
        {optHoursError && <Alert title={"Opps!"} messages={["There is inconsistency with the times."]}/>}
        {isOptionDateError && <Alert title={"Opps!"} messages={["Please set the date."]}/>}
        {isOptionEmptyError && (
          <Alert
            title="You forgot to add your date options !"
            messages={["Please add at least one  date option."]}
          />
        )}
        <div className="pt-8">
          <div>
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Settings
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              Set your event options.
            </p>
          </div>
          <div>
            <fieldset>
              <div className="mt-4 space-y-4">
                <div className="relative flex items-start">
                {/* {<div className="flex items-center h-5">
                    <input
                      id="limitCheckBox"
                      name="limitCheckBox"
                      type="checkbox"
                      className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                      onChange={CB2ChangeHandler}
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label
                      htmlFor="limit"
                      className="font-medium text-gray-700"
                    >
                      Limit how many participants can select a time
                    </label>
                    {cb2 && (
                      <input
                        type="number"
                        name="limit"
                        id="limit"
                        value={enteredLimit}
                        required
                        onChange={limitChangeHandler}
                        className="flex-1 focus:ring-indigo-500 border focus:border-indigo-500 block w-16 min-w-0 rounded-md sm:text-sm border-gray-300"
                      />
                    )}
                    <p className="text-gray-500">
                      We'll remove a time when it hits the participant limit.
                    </p>
                  </div>} */}
                </div>
                <div className="relative flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="participants"
                      name="participants"
                      type="checkbox"
                      onChange={CB3ChangeHandler}
                      className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label
                      htmlFor="participants"
                      className="font-medium text-gray-700"
                    >
                      Hide participant list
                    </label>
                    <p className="text-gray-500">
                      Get notified when a candidate accepts or rejects an offer.
                    </p>
                  </div>
                </div>
              </div>
            </fieldset>
          </div>
        </div>

        <div className="pt-2">
          <div className="flex justify-end">
            <button
              type="button"
              className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-black bg-white-700 hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              onClick={cancelCreate}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-700 hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Create Poll
            </button>
          </div>
        </div>
      </form>
      {showMessage && (
        <Notify
          navigate={navigate}
          route={"/"}
          routePageMessage={"Go to Home Page !"}
          title={`You created event ${userInfo.userName}!`}
          message={`${enteredTitle} is created! Let's go and check! `}
        />
      )}
    </div>
  );
};

export default CreatePoll;
