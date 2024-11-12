import React, { Dispatch, useEffect, useRef, useState } from "react";
import { updateIAResponseDisplayState } from "../../utils/IAResponseHelper";
import { FaThumbsUp, FaThumbsDown, FaRedo } from "react-icons/fa";
import { MdError } from "react-icons/md";

const GPTResponseDisplay = ({
  message,
  animate,
  setCanSendQuery,
  isError = false,
  handleSendMessage,
  suggestions,
}: {
  isError: boolean;
  message: any;
  animate: boolean;
  handleSendMessage: any;
  suggestions: string[] | null;
  setCanSendQuery: Dispatch<React.SetStateAction<boolean>>;
}) => {
  suggestions = suggestions ? suggestions.slice(0, 2) : null;
  const bottomRef = useRef<HTMLDivElement | null>(null);
  const [displayState, setDisplayState] = useState<{
    payload: string;
    isCompeleted: boolean;
  }>({
    payload: "",
    isCompeleted: false,
  });

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
    }, 25);
    return () => clearTimeout(timer);
  }, [message, displayState, animate, setCanSendQuery]);

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [displayState]);

  const ErrorClass = isError ? "text-red-700" : "";

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
          {isError && <MdError className="text-red-700 inline m-1 size-5" />}
          <span className={ErrorClass}>{message.payload}</span>
        </div>
      </div>
    );

  return (
    <div className="inline-block relative chat-message text-white p-3 rounded-lg max-w-2xl self-end border-[1px]">
      {isError && <MdError className="text-red-700 inline m-1 size-5" />}
      {displayState.payload.length > 0 && (
        <span className={ErrorClass}>{displayState.payload}</span>
      )}
      {displayState.isCompeleted && (
        <div className="  flex  ">
          <div className="absolute -bottom-12 flex gap-[16px]">
            {animate &&
              suggestions &&
              suggestions.map((el, index) => (
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
      )}
      {!displayState.isCompeleted && <div ref={bottomRef} />}
    </div>
  );
};

export default GPTResponseDisplay;
