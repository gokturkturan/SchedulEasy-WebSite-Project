import React, { useEffect, useState } from "react";
import TimeKeeper from "react-timekeeper";

function SelectHour({ name, keyy }) {
  const date = new Date();
  const minutes = (date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes())
  const [time, setTime] = useState(`${date.getHours()}:${minutes}`);
  const [showTime, setShowTime] = useState(false);

  useEffect(()=>{
    localStorage.setItem(keyy,time);
  },[]);

  const onChangeHandler= (newTime)=>{
    setTime(newTime.formatted24)
    localStorage.setItem(keyy,newTime.formatted24);
  }
  const timeFunction = () => {
    setShowTime(false);
    localStorage.setItem(keyy,time);
  };

  return (
    <div >
      {showTime && (
        <TimeKeeper
          time={time}
          onChange={onChangeHandler}
          hour24Mode={true}
          closeOnMinuteSelect={true}
          onDoneClick={timeFunction}
          switchToMinuteOnHourSelect
        />
      )}

      {!showTime && (
        <button
          className="border rounded-md w-2/3 h-8"
          onClick={() => setShowTime(true)}
        >
          <span className="">{time}</span>
        </button>
      )}
    </div>
  );
}
export default SelectHour;
