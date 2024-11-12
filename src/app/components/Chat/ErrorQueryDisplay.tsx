import React, { Dispatch, useEffect, useRef, useState } from "react";
import { updateIAResponseDisplayState } from "../../utils/IAResponseHelper";
import { MdError } from "react-icons/md";

const ErrorQueryDisplay = ({
  message,
  animate,
  setCanSendQuery,
}: {
  message: { intro: string };
  animate: boolean;
  setCanSendQuery: Dispatch<React.SetStateAction<boolean>>;
}) => {
  const bottomRef = useRef<HTMLDivElement | null>(null);
  const [displayState, setDisplayState] = useState<{
    intro: string;
    isCompeleted: boolean;
  }>({
    intro: "",
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
    }, 50);
    return () => clearTimeout(timer);
  }, [displayState, animate, setCanSendQuery, message]);

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [displayState]);

  return (
    <div className="chat-message text-white p-3 rounded-lg max-w-2xl self-end">
      <MdError className="text-red-700 inline m-1 size-5" />
      {animate && displayState.intro.length > 0 && (
        <span className="text-red-700">{displayState.intro}</span>
      )}
      {!animate && <span className="text-red-700">{message.intro}</span>}
      {!displayState.isCompeleted && <div ref={bottomRef} />}
    </div>
  );
};

export default ErrorQueryDisplay;
