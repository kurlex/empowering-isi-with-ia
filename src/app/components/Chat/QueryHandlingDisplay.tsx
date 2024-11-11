import React, { Dispatch, useEffect, useRef, useState } from "react";
import { QueryHandling } from "./IAResponseFactory";
import { updateIAResponseDisplayState } from "../../utils/IAResponseHelper";

const QueryHandlingDisplay = ({
  queryHandling,
  animate,
  setCanSendQuery,
}: {
  queryHandling: QueryHandling;
  animate: boolean;
  setCanSendQuery: Dispatch<React.SetStateAction<boolean>>;
}) => {
  const bottomRef = useRef<HTMLDivElement | null>(null);
  const [displayState, setDisplayState] = useState<{
    intro: string;
    tips: string[];
    isCompeleted: boolean;
  }>({
    intro: "",
    tips: [],
    isCompeleted: false,
  });

  useEffect(() => {
    if (animate) setCanSendQuery(false);
  }, [animate, setCanSendQuery]);

  useEffect(() => {
    const attributeOrder = ["tips"];
    setCanSendQuery((canSendQuery) =>
      animate ? displayState.isCompeleted : canSendQuery
    );
    if (!animate || displayState.isCompeleted) return;
    const timer = setTimeout(() => {
      setDisplayState((prevDisplayState) =>
        updateIAResponseDisplayState(
          prevDisplayState,
          queryHandling,
          attributeOrder
        )
      );
    }, 50);
    return () => clearTimeout(timer);
  }, [queryHandling, displayState, animate, setCanSendQuery]);

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [displayState]);

  if (!animate)
    return (
      <div className="chat-message text-white p-3 rounded-lg max-w-2xl self-end">
        <p>{queryHandling.intro}</p>
        <ol className="list-decimal">
          {queryHandling.tips.map((tip, i) => (
            <li key={i} className="p-2 ml-4">
              {tip}
            </li>
          ))}
        </ol>
      </div>
    );

  return (
    <div className="chat-message text-white p-3 rounded-lg max-w-2xl self-end">
      {displayState.intro.length > 0 && <p>{displayState.intro}</p>}
      {displayState.tips.length > 0 && (
        <ol className="list-decimal">
          {displayState.tips.map((tip, i) => (
            <li key={i} className="p-2 ml-4">
              {tip}
            </li>
          ))}
        </ol>
      )}
      {!displayState.isCompeleted && <div ref={bottomRef} />}
    </div>
  );
};

export default QueryHandlingDisplay;
