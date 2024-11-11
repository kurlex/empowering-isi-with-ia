"use client";

import MemberProfile from "./MemberProfile";
import ChatLinks from "./ChatLinks";
import Image from "next/image";
import charcentric from "../../assets/charcentric.png";
import Loader from "../Loader";
import { useSharedStateContext } from "../../context/SharedStateContext";

const Sidebar = () => {
  const { messagesCounter, email, chats, currentChatId, setCurrentChatId } =
    useSharedStateContext();

  return (
    <div className="px-4 w-80 min-h-full bg-base-300 py-12 grid grid-rows-[auto,1fr,auto]">
      <Image src={charcentric} alt="charcentric" />
      {(!currentChatId ||
        messagesCounter === undefined ||
        !email ||
        !chats) && <Loader />}
      {currentChatId && messagesCounter !== undefined && chats && email && (
        <>
          <ChatLinks
            chats={chats}
            currentChatId={currentChatId}
            setCurrentChatId={setCurrentChatId}
          />
          <MemberProfile email={email} />
        </>
      )}
    </div>
  );
};
export default Sidebar;
