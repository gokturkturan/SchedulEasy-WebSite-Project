import React from "react";

const OptionsCard = (props) => {
  const indexOption = [
    <div>
      <div className="flex">
        {Object.keys(props.option.options).map((index) => (
          <div className="mr-4" key={index}>
            <h3 className="text-gray-900 text-sm font-medium truncate">
              {props.option.options[index].date}
            </h3>
            <h3 className="flex justify-center text-gray-900 text-sm font-medium truncate">
              {props.option.options[index].startTime}
            </h3>
            <h3 className="flex justify-center text-gray-900 text-sm font-medium truncate">
              {props.option.options[index].endTime}
            </h3>
          </div>
        ))}
      </div>

      {/* <div>
        <h3 className="text-gray-900 text-sm font-medium truncate">
          {props.option.options[1].date}
        </h3>
        <h3 className="flex justify-center text-gray-900 text-sm font-medium truncate">
          {props.option.options[1].startTime}
        </h3>
        <h3 className="flex justify-center text-gray-900 text-sm font-medium truncate">
          {props.option.options[1].endTime}
        </h3>
      </div> */}
    </div>,
  ];
  return (
    <div>
      <div>
        <div className="flex1">
          <div className="flex justify-center">{indexOption}</div>
        </div>
      </div>
    </div>
  );
};

export default OptionsCard;
