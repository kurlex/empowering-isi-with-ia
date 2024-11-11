import { useSharedStateContext } from "../../context/SharedStateContext";

const MessagesCounter = () => {
  const { messagesCounter } = useSharedStateContext();

  return (
    <div className="m-1 my-7">
      <h3 className="my-1">Chat Messages</h3>
      <div className="my-1 py-4 text-center bg-[hsl(213.3,17.6%,20%)] rounded-lg">
        {messagesCounter} / 50
      </div>
    </div>
  );
};

export default MessagesCounter;
