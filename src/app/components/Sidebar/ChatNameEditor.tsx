import { ReactNode, useEffect, useRef, useState } from "react";
import { IoMdSave } from "react-icons/io";
interface IChatNameEditorProps {
  children: ReactNode | undefined;
  onCancel: any;
  onSave: (name: string) => void;
}
const ChatNameEditor = ({
  children,
  onCancel,
  onSave,
}: IChatNameEditorProps) => {
  const initialChatCreatorStatus = {
    isEditing: !!onCancel,
    chatTitle: "",
  };
  const [chatCreatorStatus, setChatCreatorStatus] = useState(
    initialChatCreatorStatus
  );
  const inputRef = useRef<HTMLLIElement | null>(null);

  const setChatTitle = (chatTitle: string) => {
    setChatCreatorStatus((oldChatCreatorStatus) => ({
      ...oldChatCreatorStatus,
      chatTitle,
    }));
  };

  const setIsEditing = (isEditing) => {
    setChatCreatorStatus((oldChatCreatorStatus) => ({
      ...oldChatCreatorStatus,
      isEditing,
    }));
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        if (onCancel) onCancel();
        setIsEditing(false);
      }
    };

    if (chatCreatorStatus.isEditing) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [chatCreatorStatus, onCancel]);

  return (
    <li
      ref={inputRef}
      className={`m-1 ${
        chatCreatorStatus.isEditing ? "hover:bg-transparent" : ""
      }`}
    >
      {chatCreatorStatus.isEditing ? (
        <div className="flex items-center p-0 hover:bg-transparent">
          <input
            type="text"
            value={chatCreatorStatus.chatTitle}
            onChange={(e) => setChatTitle(e.target.value)}
            onKeyPress={(e) =>
              e.key === "Enter" && onSave(chatCreatorStatus.chatTitle)
            }
            placeholder="Enter chat title"
            className="input input-bordered h-8 m-w-10 m-0"
            autoFocus
          />
          <button
            onClick={() => onSave(chatCreatorStatus.chatTitle)}
            className="ml-2"
          >
            <IoMdSave />
          </button>
        </div>
      ) : (
        <button onClick={() => setIsEditing(true)}>{children}</button>
      )}
    </li>
  );
};

export default ChatNameEditor;
