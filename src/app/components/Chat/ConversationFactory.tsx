import React, { Dispatch } from "react";
import UserMessage from "./UserMessage";
import GPTResponseDisplay from "./GPTResponseDisplay";
import LoadingDots from "./LoadingDots";

export type conversation = any;
interface IConversationFactoryProps {
  conversation: conversation[];
  setCanSendQuery: Dispatch<React.SetStateAction<boolean>>;
}

export enum IAResponseSourceEnum {
  local = "local",
  database = "database",
}

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

        switch (message.type) {
          case "response":
            return (
              <GPTResponseDisplay
                key={index}
                message={message}
                shouldAskQuestion
                animate={animate}
                isError={false}
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
                isError={false}
                setCanSendQuery={setCanSendQuery}
              />
            );
          case "error":
            return (
              <GPTResponseDisplay
                key={index}
                message={message}
                shouldAskQuestion={false}
                animate={animate}
                isError
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
