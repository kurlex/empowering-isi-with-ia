import React, { Dispatch, useEffect, useRef, useState } from "react";
import { updateIAResponseDisplayState } from "../../utils/IAResponseHelper";
import { FaThumbsUp, FaThumbsDown, FaRedo } from "react-icons/fa";

const GPTResponseDisplay = ({
  message,
  animate,
  setCanSendQuery,
  shouldAskQuestion = false,
  handleSendMessage,
}: {
  message: any;
  animate: boolean;
  shouldAskQuestion: boolean;
  handleSendMessage: any;
  setCanSendQuery: Dispatch<React.SetStateAction<boolean>>;
}) => {
  const bottomRef = useRef<HTMLDivElement | null>(null);
  const [displayState, setDisplayState] = useState<{
    payload: string;
    isCompeleted: boolean;
  }>({
    payload: "",
    isCompeleted: false,
  });
  const testSuggestions = [
    "you are in second degree",
    "you are in third degree",
  ];

  useEffect(() => {
    if (animate) setCanSendQuery(false);
  }, [animate, setCanSendQuery]);

  useEffect(() => {
    setCanSendQuery((canSendQuery) =>
      animate ? displayState.isCompeleted : canSendQuery
    );
    if (!animate || displayState.isCompeleted) return;
    const timer = setTimeout(() => {
      setDisplayState((prevDisplayState) =>
        updateIAResponseDisplayState(prevDisplayState, message)
      );
    }, 50);
    return () => clearTimeout(timer);
  }, [message, displayState, animate, setCanSendQuery]);

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [displayState]);

  const handleButtonClick = (type: string) => {
    console.log(type);
  };

  const handleActionClick = (el: string) => {
    handleSendMessage(el);
  };

  if (!animate)
    return (
      <div className="inline-block relative mb-[20px]">
        <div className="chat-message text-white p-3 rounded-lg max-w-2xl mb-8">
          <p>{message.payload}</p>
          <div className=" flex justify-between">
            <div className="absolute -bottom-4 right-2 flex gap-2">
              <button
                className="text-white p-2 bg-gray-800 rounded-full hover:bg-gray-600"
                onClick={() => handleButtonClick("oui")}
              >
                <FaThumbsUp />
              </button>
              <button
                className="text-white p-2 bg-gray-800 rounded-full hover:bg-gray-600"
                onClick={() => handleButtonClick("non")}
              >
                <FaThumbsDown />
              </button>
              <button
                className="text-white p-2 bg-gray-800 rounded-full hover:bg-gray-600"
                onClick={() => handleButtonClick("plus")}
              >
                <FaRedo />
              </button>
            </div>
            <div className="absolute -bottom-3 flex gap-[16px]">
              {testSuggestions.map((el, index) => (
                <button
                  key={index}
                  className="max-w-[200px] truncate border-[1px] rounded-lg p-[4px]"
                  onClick={() => handleActionClick(el)}
                >
                  {el}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    );

  return (
    <div className="chat-message text-white p-3 rounded-lg max-w-2xl self-end ">
      {displayState.payload.length > 0 && <p>{displayState.payload}</p>}
      {!displayState.isCompeleted && <div ref={bottomRef} />}
      {displayState.isCompeleted && shouldAskQuestion && <>buttons here</>}
    </div>
  );
};

export default GPTResponseDisplay;
