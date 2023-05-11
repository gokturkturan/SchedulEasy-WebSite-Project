import React, { useState } from "react";
import SelectHour from "./SelectHour";
import { useLocation, useNavigate } from "react-router-dom";
import DateOptionCard from "../components/DateOptionCard";
import Alert from "../UI/Alert";
import { DatabaseHandler } from "../database/DatabaseHandler";

const AddOption = () => {
  const eventInfo = useLocation().state;
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const [isOptionEmpty, setIsOptionEmpty] = useState(true);
  const [isOptionEmptyError, setIsOptionEmptyError] = useState(false);
  const [optError, setOptError] = useState(false);
  const [alreadyError, setAlreadyError] = useState(false);
  const [noOptionError,setNoOptionError] = useState(false);
  const [options, setOptions] = useState([]);
  const[optHoursError,setOptHoursError] = useState(false);
  var err = false;
  var alreadyerr = false;
  const addOptionHandler = () => {
    const sTime = localStorage.getItem("startTime");
    const eTime = localStorage.getItem("endTime");
    if (
      sTime === undefined ||
      eTime === undefined ||
      (enteredStartDate === undefined || enteredStartDate === "")
    ) {
      setIsOptionEmptyError(true);
    } else {
      let newOpt = { date: enteredStartDate, startTime: sTime, endTime: eTime,creatorName: userInfo["userName"] };
      Object.keys(eventInfo["options"]).forEach((key) => {
        console.log(eventInfo["options"][key],sTime)
        if (
          enteredStartDate === eventInfo["options"][key]["date"] &&
          sTime === eventInfo["options"][key]["startTime"] &&
          eTime === eventInfo["options"][key]["endTime"]
        ) {
          setAlreadyError(true)
          alreadyerr = true
        }
      });
      if(!(alreadyerr)){
        options.forEach((option) => {
          if (
            option["date"] === enteredStartDate &&
            option["startTime"] == sTime &&
            option["endTime"] == eTime
          ) {
            err = true;
            setOptError(true);
          }
        });
        if (!err) {
          if(sTime === eTime || sTime > eTime){
            console.log(sTime,eTime)
            setOptHoursError(true);
         }else{
          setOptions((values) => [...values, newOpt]);
          setAlreadyError(false);
          setIsOptionEmpty(false);
          setOptError(false);
          setIsOptionEmptyError(false);
          setOptHoursError(false);
         }
          
        }

      }
      console.log(options);
    }
  };
  const [enteredStartDate, setEnteredStartDate] = useState();
  const startDateChangeHandler = (event) => {
    setEnteredStartDate(event.target.value);
    setIsOptionEmptyError(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if(options.length === 0){
      setNoOptionError(true)
    }else{
      DatabaseHandler.setCustomDateOption(eventInfo["id"],eventInfo["options"],options)
      navigate(-1);
    }
  };

  const navigate = useNavigate();

  const cancel = () => {
    navigate(-1);
  };

  return (
    <>
      <form
        className="sm:w-full md:w-1/2  md:mx-auto space-y-8 divide-y divide-gray-200 sm:space-y-5 divide-gray-200 mt-14 mr-20 ml-20 mb-2"
        onSubmit={handleSubmit}
      >
        <div className="pt-8">
          <h1 className="text-lg leading-6 text-xl text-gray-900 font-semibold mb-4">
            What is your recommendation ?
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
              onClick={addOptionHandler}
              type="button"
            >
              Add Option
            </button>
            <button
              className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-black bg-white-700 hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              type="button"
              onClick={cancel}
            >
              Cancel
            </button>
          </div>
          {!isOptionEmpty && <DateOptionCard options={options} />}
          {optError && (
            <Alert
              title={"Opps!"}
              messages={["You can not add same option again"]}
            />
          )}
          {isOptionEmptyError && !(noOptionError) && (
            <Alert
              title="You forgot to set the date !"
              messages={["You have to set a date first."]}
            />
          )}
          {alreadyError && <Alert
              title="Existed date option !"
              messages={["There is a date option like that in the poll."]}
            />}
            {noOptionError && <Alert
              title="Add an option first !"
              messages={["Please add at least one date option."]}
            />}
            {optHoursError && <Alert title={"Opps!"} messages={["There is inconsistency in the times."]}/>}
          <button
            type="submit"
            className="flex justify-center py-1 px-2 border border-transparent text-base font-medium rounded-md text-white bg-blue-700 hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Submit
          </button>
        </div>
      </form>
    </>
  );
};

export default AddOption;
