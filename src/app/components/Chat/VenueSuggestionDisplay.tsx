import React, { Dispatch, useEffect, useRef, useState } from "react";
import { venue, VenueSuggestion } from "./IAResponseFactory";
import { updateIAResponseDisplayState } from "../../utils/IAResponseHelper";

const VenueSuggestionDisplay = ({
  venueSuggestion,
  animate,
  setCanSendQuery,
}: {
  venueSuggestion: VenueSuggestion;
  animate: boolean;
  setCanSendQuery: Dispatch<React.SetStateAction<boolean>>;
}) => {
  const bottomRef = useRef<HTMLDivElement | null>(null);
  const [displayState, setDisplayState] = useState<{
    intro: string;
    venues: venue[];
    isCompeleted: boolean;
  }>({
    intro: "",
    venues: [],
    isCompeleted: false,
  });

  useEffect(() => {
    if (animate) setCanSendQuery(false);
  }, [animate, setCanSendQuery]);

  useEffect(() => {
    const attributeOrder = ["name", "description", "capacity"];
    setCanSendQuery((canSendQuery) =>
      animate ? displayState.isCompeleted : canSendQuery
    );
    if (!animate || displayState.isCompeleted) return;
    const timer = setTimeout(() => {
      setDisplayState((prevDisplayState) =>
        updateIAResponseDisplayState(
          prevDisplayState,
          venueSuggestion,
          attributeOrder
        )
      );
    }, 50);
    return () => clearTimeout(timer);
  }, [venueSuggestion, displayState, animate, setCanSendQuery]);

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [displayState]);

  if (!animate)
    return (
      <div className="chat-message text-white p-3 rounded-lg max-w-2xl self-end">
        <p>{venueSuggestion.intro}</p>
        <ol className="list-decimal">
          {venueSuggestion.venues.map((venue, i) => (
            <li key={i} className="p-2 ml-4">
              <strong>{venue.name}: </strong>
              <span>{venue.description}</span>
              {venue.capacity.length > 0 && (
                <>
                  <strong> Capacity: </strong>
                  <span>{venue.capacity}</span>
                </>
              )}
            </li>
          ))}
        </ol>
      </div>
    );

  return (
    <div className="chat-message text-white p-3 rounded-lg max-w-2xl self-end">
      {displayState.intro.length > 0 && <p>{displayState.intro}</p>}
      {displayState.venues.length > 0 && (
        <ol className="list-decimal">
          {displayState.venues.map((venue, i) => (
            <li key={i} className="p-2 ml-4">
              <strong>{venue.name}: </strong>
              <span>{venue.description}</span>
              {venue.capacity.length > 0 && (
                <>
                  <strong> Capacity: </strong>
                  <span>{venue.capacity}</span>
                </>
              )}
            </li>
          ))}
        </ol>
      )}
      {!displayState.isCompeleted && <div ref={bottomRef} />}
    </div>
  );
};

export default VenueSuggestionDisplay;
