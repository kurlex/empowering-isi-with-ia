import { Chat } from "@prisma/client";
import { useState, useRef, useEffect } from "react";
import ChatNameEditor from "./ChatNameEditor";
import { useSharedStateContext } from "../../context/SharedStateContext";
import { handleUpdateChatAction } from "../../serverActions/HandleUpdateChatAction";
import { handleDeleteChatAction } from "../../serverActions/HandleDeleteChatAction";

interface IChatLinkProps {
  chat: Chat;
  isActive: boolean;
  setCurrentChatId: (id: string) => void;
}

const ChatLink = ({ isActive, chat, setCurrentChatId }: IChatLinkProps) => {
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [menuVisible, setMenuVisible] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const { chats, resetChats, setChats, fetchMessagesCounter } =
    useSharedStateContext();

  const updateChatName = async (chatId: string, newName: string) => {
    newName = newName.trim();
    if (!newName) return;
    const oldChats = !chats ? [] : [...chats];
    resetChats();
    const updatedChat = await handleUpdateChatAction(chatId, newName);
    const chatToUpdateIndex = oldChats.findIndex((chat) => chat.id === chatId);
    setChats([
      ...oldChats.slice(0, chatToUpdateIndex),
      updatedChat,
      ...oldChats.slice(chatToUpdateIndex + 1),
    ]);
  };

  const handleDeleteChat = async (chatId: string) => {
    const oldChats = !chats ? [] : [...chats];
    resetChats();
    await handleDeleteChatAction(chatId);
    fetchMessagesCounter();
    const chatToUpdateIndex = oldChats.findIndex((chat) => chat.id === chatId);
    setChats([
      ...oldChats.slice(0, chatToUpdateIndex),
      ...oldChats.slice(chatToUpdateIndex + 1),
    ]);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        overlayRef.current &&
        !overlayRef.current.contains(event.target as Node)
      ) {
        setMenuVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  if (isEditing) {
    return (
      <ChatNameEditor
        onCancel={() => setIsEditing(false)}
        onSave={(name: string) => updateChatName(chat.id, name)}
      >
        {undefined}
      </ChatNameEditor>
    );
  }

  return (
    <li
      className="relative m-1"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <button
        className={isActive ? "active" : ""}
        onClick={() => setCurrentChatId(chat.id)}
      >
        {chat.name}
      </button>
      {(isHovered || menuVisible) && (
        <>
          <div
            className="absolute right-0 top-1/2 transform -translate-y-1/2 cursor-pointer hover:bg-transparent"
            onClick={() => setMenuVisible(true)}
          >
            <span className="text-xl hover:bg-transparent">...</span>
          </div>
          {menuVisible && (
            <>
              <div
                ref={overlayRef}
                className="fixed inset-0"
                onClick={() => setMenuVisible(false)}
              />

              <div
                ref={menuRef}
                className="absolute right-0 top-full shadow-lg menu menu-vertical text-base-content z-50"
              >
                <div onClick={() => setIsEditing(true)} className="px-4 py-2">
                  Rename
                </div>
                <div
                  onClick={() => handleDeleteChat(chat.id)}
                  className="px-4 py-2 text-red-700"
                >
                  Delete
                </div>
              </div>
            </>
          )}
        </>
      )}
    </li>
  );
};

export default ChatLink;
