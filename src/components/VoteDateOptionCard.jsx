import React, { useState } from "react";

import {
  CheckIcon,
  XIcon,
  QuestionMarkCircleIcon,
  CalendarIcon,
} from "@heroicons/react/solid";
import ParticipantList from "./ParticipantList";
import { ClockIcon } from "@heroicons/react/outline";

export default function VoteDateOption({
  eventInfo,
  selectedDateId,
  optInfo,
  handleSelectedDates,
  comings,
  Ncomings,
  ifNeed,
  userName,
  creator,
  Checked,
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

  var showCheckBox;
  if (eventInfo.creatorName != userName) {
    showCheckBox = false;
    if (selectedDateId == optInfo.id) {
      showCheckBox = true;
    }
  } else {
    showCheckBox = true;
  }
  //if its undefined we have to initilize as an array.
  if (comings === undefined) {
    comings = [];
  }
  if (Ncomings === undefined) {
    Ncomings = [];
  }
  if (ifNeed === undefined) {
    ifNeed = [];
  }
  const [status, setStatus] = useState(
    comings.includes(userName)
      ? "Coming"
      : Ncomings.includes(userName)
      ? "Not coming"
      : ifNeed.includes(userName)
      ? "If need be"
      : "Pending"
  );

  const VotedOptionsHandler = (votedOption) => {
    if (
      (votedOption.isVoteYes === false) &
      (votedOption.isVoteNo === false) &
      (votedOption.isVoteIfNeedBe === false)
    ) {
      setStatus("Pending");
    } else if (votedOption.isVoteYes === true) {
      setStatus("Coming");
    } else if (votedOption.isVoteNo === true) {
      setStatus("Not coming");
    } else if (votedOption.isVoteIfNeedBe === true) {
      setStatus("If need be");
    }
  };

  const [yesVote, setYesVote] = useState(0);
  const [yesClicked, setYesClicked] = useState(comings.includes(userName));

  const [NoVote, setNoVote] = useState(0);
  const [NoClicked, setNoClicked] = useState(Ncomings.includes(userName));

  const [ifNeedBe, setIfNeedBe] = useState(0);
  const [ifNeedBeClicked, setIfNeedBeClicked] = useState(
    ifNeed.includes(userName)
  );

  const [isChecked, setIsChecked] = useState(0);

  let votedOption = {
    ...optInfo,
    isVoteYes: yesClicked,
    isVoteNo: NoClicked,
    isVoteIfNeedBe: ifNeedBeClicked,
  };

  const yesVoteHandler = (prevVote) => {
    setNoClicked(false);
    setIfNeedBeClicked(false);
    setYesClicked(true);
    setYesVote((prevVote) => {
      if (yesClicked === true) {
        setYesClicked(false);
        return [parseInt(prevVote) - 1];
      } else {
        return [parseInt(prevVote) + 1];
      }
    });
    votedOption.isVoteYes = !yesClicked;
    votedOption.isVoteNo = false;
    votedOption.isVoteIfNeedBe = false;
    VotedOptionsHandler(votedOption);
    handleSelectedDates(optInfo.id, "Coming");
    //console.log(ifNeedBeClicked, NoClicked, yesClicked);
  };

  const checked = (event) => {
    if (event.target.checked) {
      Checked(1, optInfo.id);
    } else {
      Checked(0, optInfo.id);
    }
  };

  const ifNeedBeVoteHandler = (prevVote) => {
    setNoClicked(false);
    setYesClicked(false);
    setIfNeedBeClicked(true);
    setIfNeedBe((prevVote) => {
      if (ifNeedBeClicked === true) {
        setIfNeedBeClicked(false);
        return [parseInt(prevVote) - 1];
      } else {
        return [parseInt(prevVote) + 1];
      }
    });
    votedOption.isVoteIfNeedBe = !ifNeedBeClicked;
    votedOption.isVoteNo = false;
    votedOption.isVoteYes = false;
    VotedOptionsHandler(votedOption);
    handleSelectedDates(optInfo.id, "If need");
    //console.log(ifNeedBeClicked, NoClicked, yesClicked);
  };

  const noVoteHandler = (prevVote) => {
    setYesClicked(false);
    setIfNeedBeClicked(false);
    setNoVote((prevVote) => {
      if (NoClicked === true) {
        setNoClicked(false);
        return [parseInt(prevVote) - 1];
      } else {
        setNoClicked(true);
        return [parseInt(prevVote) + 1];
      }
    });
    votedOption.isVoteNo = !NoClicked;
    votedOption.isVoteYes = false;
    votedOption.isVoteIfNeedBe = false;
    VotedOptionsHandler(votedOption);
    handleSelectedDates(optInfo.id, "Not");
    //console.log(ifNeedBeClicked, NoClicked, yesClicked);
  };
  let statusPart = (
    <span className="flex-shrink-0 inline-block px-2 py-0.5 text-gray-800 text-xs font-medium bg-gray-100 rounded-full">
      {status}
    </span>
  );
  if (status === "Coming") {
    statusPart = (
      <span className="flex-shrink-0 inline-block px-2 py-0.5 text-black-800 text-xs font-medium bg-green-100 rounded-full">
        {status}
      </span>
    );
  }

  if (status === "Not coming") {
    statusPart = (
      <span className="flex-shrink-0 inline-block px-2 py-0.5 text-black-800 text-xs font-medium bg-red-100 rounded-full">
        {status}
      </span>
    );
  }
  if (status === "If need be") {
    statusPart = (
      <span className="flex-shrink-0 inline-block px-2 py-0.5 text-black-800 text-xs font-medium bg-yellow-100 rounded-full">
        {status}
      </span>
    );
  }

  return (
    <ul role="list" className="col-span-1 px-2 md:p-4 ">
      <li className=" bg-white rounded-lg shadow divide-y divide-gray-200 mt-4">
        <div className="w-full flex items-center justify-between p-6 space-x-6">
          <div className="flex-1 truncate">
            <div className="flex items-center space-x-3">
              {!eventInfo.hideParticipants && (
                <span className="flex-shrink-0 inline-block px-2 py-0.5 text-black-800 text-xs font-medium bg-blue-100 rounded-full">
                  {`Created by ${creator}`}
                </span>
              )}

              {showCheckBox && (
                <div>
                  <input
                    id="myCheck"
                    type="checkbox"
                    checked={selectedDateId === optInfo.id}
                    onChange={checked}
                  />
                </div>
              )}
            </div>
            <div className="flex items-center space-x-3">{statusPart}</div>
            <div className="flex items-center space-x-1">
              <CalendarIcon height={15} width={15} />
              <h3 className="text-gray-900 text-sm font-medium truncate">
                Date: {optInfo.date}
              </h3>
              {/* <span className="flex-shrink-0 inline-block px-2 py-0.5 text-green-800 text-xs font-medium bg-green-100 rounded-full">
                  {person.role}
                </span> */}
            </div>
            <div className="flex items-center space-x-1">
              <ClockIcon height={15} width={15} />
              <p className="mt-1 text-gray-500 text-sm truncate">
                {optInfo.startTime} - {optInfo.endTime}
              </p>
            </div>

            <div className="flex items-center space-x-3">
              {icons["coming"]}
              {comings.length}
            </div>
            <div className="flex items-center space-x-3">
              {icons["not"]}
              {Ncomings.length}
            </div>
            <div className="flex items-center space-x-3">
              {icons["if"]}
              {ifNeed.length}
            </div>
          </div>

          <div className="flex-1">
            {!eventInfo.hideParticipants && (
              <ParticipantList
                userName={userName}
                comings={comings}
                Ncomings={Ncomings}
                ifNeed={ifNeed}
              />
            )}
          </div>
        </div>
        <div>
          <div className="-mt-px flex divide-x divide-gray-200">
            <div className="w-0 flex-1 flex">
              {yesClicked === true ? (
                <button
                  onClick={yesVoteHandler}
                  className="relative -mr-px w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-gray-500 font-medium border bg-green-500"
                >
                  <CheckIcon className="w-7 h-7" aria-hidden="true" />
                </button>
              ) : (
                <button
                  onClick={yesVoteHandler}
                  className="relative -mr-px w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-gray-700 font-medium border hover:text-gray-500"
                >
                  <CheckIcon
                    className="w-7 h-7 text-gray-400 hover:text-green-500"
                    aria-hidden="true"
                  />
                </button>
              )}
            </div>
            <div className="-ml-px w-0 flex-1 flex">
              {NoClicked === true ? (
                <button
                  onClick={noVoteHandler}
                  className="relative w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-gray-500 font-medium border  bg-red-400"
                >
                  <XIcon className="w-7 h-7" aria-hidden="true" />
                </button>
              ) : (
                <button
                  onClick={noVoteHandler}
                  className="relative w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-gray-500 font-medium border hover:text-gray-500"
                >
                  <XIcon
                    className="w-7 h-7 text-gray-400 hover:text-red-500"
                    aria-hidden="true"
                  />
                </button>
              )}
            </div>
            <div className="-ml-px w-0 flex-1 flex">
              {ifNeedBeClicked === true ? (
                <button
                  onClick={ifNeedBeVoteHandler}
                  className="relative -mr-px w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-gray-500 font-medium border bg-orange-400"
                >
                  <QuestionMarkCircleIcon
                    className="w-7 h-7"
                    aria-hidden="true"
                  />
                </button>
              ) : (
                <button
                  onClick={ifNeedBeVoteHandler}
                  className="relative -mr-px w-0 flex-1 inline-flex justify-center py-4 text-sm text-gray-700 font-medium border "
                >
                  <QuestionMarkCircleIcon
                    className="w-7 h-7 text-gray-400 hover:text-orange-400"
                    aria-hidden="true"
                  />
                </button>
              )}
            </div>
          </div>
        </div>
      </li>
    </ul>
  );
}
