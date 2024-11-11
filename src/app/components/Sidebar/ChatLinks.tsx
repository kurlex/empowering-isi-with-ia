"use client";
import { Chat } from "@prisma/client";
import ChatCreator from "./ChatNameEditor";
import ChatLink from "./ChatLink";
import { IoMdCreate } from "react-icons/io";
import { useSharedStateContext } from "../../context/SharedStateContext";
import MessagesCounter from "./MessagesCounter";
import { handleCreateChatAction } from "../../serverActions/HandleCreateChatAction";

const ChatLinks = ({
  chats,
  currentChatId,
  setCurrentChatId,
}: {
  chats: Chat[];
  currentChatId: string;
  setCurrentChatId: any;
}) => {
  const { userId, resetChats, setChats } = useSharedStateContext();
  const addNewChat = async (name: string) => {
    name = name.trim();
    if (!name || !userId) return;
    const oldChats = [...chats];
    resetChats();
    const newChat = await handleCreateChatAction(userId, name);
    setChats([newChat, ...oldChats]);
  };

  return (
    <div className="menu text-base-content">
      <MessagesCounter />
      {chats.map((chat) => (
        <ChatLink
          key={chat.id}
          isActive={chat.id === currentChatId}
          chat={chat}
          setCurrentChatId={setCurrentChatId}
        />
      ))}
      <ChatCreator onCancel={undefined} onSave={addNewChat}>
        <IoMdCreate />
        Create New Chat
      </ChatCreator>
    </div>
  );
};
export default ChatLinks;
