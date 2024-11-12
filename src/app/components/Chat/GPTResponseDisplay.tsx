import React, { Dispatch, useEffect, useRef, useState } from "react";
import { updateIAResponseDisplayState } from "../../utils/IAResponseHelper";

const GPTResponseDisplay = ({
  message,
  animate,
  setCanSendQuery,
  shouldAskQuestion = false,
}: {
  message: any;
  animate: boolean;
  shouldAskQuestion: boolean;
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

  if (!animate)
    return (
      <div className="chat-message text-white p-3 rounded-lg max-w-2xl self-end">
        <p>{message.payload}</p>
      </div>
    );

  return (
    <div className="chat-message text-white p-3 rounded-lg max-w-2xl self-end">
      {displayState.payload.length > 0 && <p>{displayState.payload}</p>}
      {!displayState.isCompeleted && <div ref={bottomRef} />}
      {displayState.isCompeleted && shouldAskQuestion && <>buttons here</>}
    </div>
  );
};

export default GPTResponseDisplay;
