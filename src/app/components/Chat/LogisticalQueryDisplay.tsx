import React, { Dispatch, useEffect, useRef, useState } from "react";
import { item, LogisticalQuery } from "./IAResponseFactory";
import { updateIAResponseDisplayState } from "../../utils/IAResponseHelper";

const LogisticalQueryDisplay = ({
  logisticalQuery,
  animate,
  setCanSendQuery,
}: {
  logisticalQuery: LogisticalQuery;
  animate: boolean;
  setCanSendQuery: Dispatch<React.SetStateAction<boolean>>;
}) => {
  const bottomRef = useRef<HTMLDivElement | null>(null);
  const [displayState, setDisplayState] = useState<{
    intro: string;
    items: item[];
    isCompeleted: boolean;
  }>({
    intro: "",
    items: [],
    isCompeleted: false,
  });

  useEffect(() => {
    if (animate) setCanSendQuery(false);
  }, [animate, setCanSendQuery]);

  useEffect(() => {
    const attributeOrder = ["type", "examples"];
    setCanSendQuery((canSendQuery) =>
      animate ? displayState.isCompeleted : canSendQuery
    );
    if (!animate || displayState.isCompeleted) return;
    const timer = setTimeout(() => {
      setDisplayState((prevDisplayState) =>
        updateIAResponseDisplayState(
          prevDisplayState,
          logisticalQuery,
          attributeOrder
        )
      );
    }, 50);
    return () => clearTimeout(timer);
  }, [logisticalQuery, displayState, animate, setCanSendQuery]);

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [displayState]);

  if (!animate)
    return (
      <div className="chat-message text-white p-3 rounded-lg max-w-2xl self-end">
        <p>{logisticalQuery.intro}</p>
        <ol className="list-decimal">
          {logisticalQuery.items.map((item, i) => (
            <li key={i} className="p-2 ml-4">
              <strong>{item.type}: </strong>
              <span>{item.examples}</span>
            </li>
          ))}
        </ol>
      </div>
    );

  return (
    <div className="chat-message text-white p-3 rounded-lg max-w-2xl self-end">
      {displayState.intro.length > 0 && <p>{displayState.intro}</p>}
      {displayState.items.length > 0 && (
        <ol className="list-decimal">
          {displayState.items.map((item, i) => (
            <li key={i} className="p-2 ml-4">
              <strong>{item.type}: </strong>
              <span>{item.examples}</span>
            </li>
          ))}
        </ol>
      )}
      {!displayState.isCompeleted && <div ref={bottomRef} />}
    </div>
  );
};

export default LogisticalQueryDisplay;
