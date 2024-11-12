import React, { Dispatch } from "react";
import {
  BaseIAResponse,
  IAResponseSourceEnum,
  LogisticalQuery,
  QueryHandling,
  VenueSuggestion,
} from "./IAResponseFactory";
import UserMessage from "./UserMessage";
import VenueSuggestionDisplay from "./VenueSuggestionDisplay";
import GPTResponseDisplay from "./GPTResponseDisplay";
import QueryHandlingDisplay from "./QueryHandlingDisplay";
import LoadingDots from "./LoadingDots";
import ErrorQueryDisplay from "./ErrorQueryDisplay";
import { IAResponseCategoryEnum } from "../../../domain/enums/IAResponseCategoryEnum";

export type conversation = any;
interface IConversationFactoryProps {
  conversation: conversation[];
  setCanSendQuery: Dispatch<React.SetStateAction<boolean>>;
}

const unsupportedQueryMessage = {
  intro:
    "you requested an unsupported query, please make sure that your query is an event related Query",
};

const errorMessage = {
  intro:
    "an error occured while trying to respond to your request, please try again later",
};

const ConversationFactory = ({
  conversation,
  setCanSendQuery,
}: IConversationFactoryProps) => {
  return (
    <>
      {conversation.map((message, index) => {
        if (typeof message === "string") {
          return <UserMessage key={index} message={message} />;
        }

        let animate =
          conversation.length - 1 === index &&
          message.source === IAResponseSourceEnum.local;
        console.log("front", message);
        switch (message.type) {
          case "response":
            return (
              <GPTResponseDisplay
                key={index}
                message={message}
                shouldAskQuestion
                animate={animate}
                setCanSendQuery={setCanSendQuery}
              />
            );
          case "question":
            return (
              <GPTResponseDisplay
                key={index}
                message={message}
                shouldAskQuestion={false}
                animate={animate}
                setCanSendQuery={setCanSendQuery}
              />
            );
          case "error":
            return (
              <ErrorQueryDisplay
                message={errorMessage}
                key={index}
                animate={animate}
                setCanSendQuery={setCanSendQuery}
              />
            );
          default:
            return <LoadingDots key={index} />;
        }
      })}
    </>
  );
};
export default ConversationFactory;
