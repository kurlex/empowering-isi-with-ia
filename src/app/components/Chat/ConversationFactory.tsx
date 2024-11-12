import React, { Dispatch } from "react";
import UserMessage from "./UserMessage";
import GPTResponseDisplay from "./GPTResponseDisplay";
import LoadingDots from "./LoadingDots";

export type conversation = any;
interface IConversationFactoryProps {
  conversation: conversation[];
  setCanSendQuery: Dispatch<React.SetStateAction<boolean>>;
  handleSendMessage: any;
}

export enum IAResponseSourceEnum {
  local = "local",
  database = "database",
}

const ConversationFactory = ({
  conversation,
  setCanSendQuery,
  handleSendMessage,
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
                animate={animate}
                isError={false}
                setCanSendQuery={setCanSendQuery}
                handleSendMessage={handleSendMessage}
                suggestions={null}
              />
            );
          case "question":
            return (
              <GPTResponseDisplay
                key={index}
                message={message}
                animate={animate}
                isError={false}
                setCanSendQuery={setCanSendQuery}
                handleSendMessage={handleSendMessage}
                suggestions={message.suggestions}
              />
            );
          case "error":
            return (
              <GPTResponseDisplay
                key={index}
                message={message}
                animate={animate}
                isError
                setCanSendQuery={setCanSendQuery}
                handleSendMessage={handleSendMessage}
                suggestions={null}
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
