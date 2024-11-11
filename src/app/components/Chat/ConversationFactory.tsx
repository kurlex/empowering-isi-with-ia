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
import LogisticalQueryDisplay from "./LogisticalQueryDisplay";
import QueryHandlingDisplay from "./QueryHandlingDisplay";
import LoadingDots from "./LoadingDots";
import ErrorQueryDisplay from "./ErrorQueryDisplay";
import { IAResponseCategoryEnum } from "../../../domain/enums/IAResponseCategoryEnum";

export type conversation = string | BaseIAResponse;
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

        switch (message.category) {
          case IAResponseCategoryEnum.logistical_query:
            let logisticalQuery = message as LogisticalQuery;
            return (
              <LogisticalQueryDisplay
                key={index}
                logisticalQuery={logisticalQuery}
                animate={animate}
                setCanSendQuery={setCanSendQuery}
              />
            );
          case IAResponseCategoryEnum.query_handling:
            let queryHandling = message as QueryHandling;
            return (
              <QueryHandlingDisplay
                key={index}
                queryHandling={queryHandling}
                animate={animate}
                setCanSendQuery={setCanSendQuery}
              />
            );
          case IAResponseCategoryEnum.venue_suggestion:
            let venueSuggestion = message as VenueSuggestion;
            return (
              <VenueSuggestionDisplay
                key={index}
                venueSuggestion={venueSuggestion}
                animate={animate}
                setCanSendQuery={setCanSendQuery}
              />
            );
          case IAResponseCategoryEnum.none:
            return (
              <ErrorQueryDisplay
                message={unsupportedQueryMessage}
                key={index}
                animate={animate}
                setCanSendQuery={setCanSendQuery}
              />
            );
          case IAResponseCategoryEnum.error:
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
