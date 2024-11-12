"use client";

import { useEffect, useState } from "react";
import React from "react";
import ConversationFactory, {
  conversation,
  IAResponseSourceEnum,
} from "./ConversationFactory";
import { FaPause } from "react-icons/fa";
import Loader from "../Loader";
import { useSharedStateContext } from "../../context/SharedStateContext";
import { handleGetConversationAction } from "../../serverActions/HandleGetConversationAction";
import { handleCreateConversationAction } from "../../serverActions/HandleCreateConversationAction";
const Chat = () => {
  const [conversations, setConversations] = useState<conversation[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [prompt, setPrompt] = useState<string>("");
  const [canSendQuery, setCanSendQuery] = useState<boolean>(true);
  const { userId, currentChatId, fetchMessagesCounter } =
    useSharedStateContext();
  useEffect(() => {
    const fetchOldConversations = async () => {
      if (!currentChatId) return;
      setIsLoading(true);
      const rawSavedConversations = await handleGetConversationAction(
        currentChatId
      );

      let savedConversations: conversation[] = [];

      rawSavedConversations.forEach((savedConversation) => {
        savedConversations.push(savedConversation.request);
        savedConversations.push(JSON.parse(savedConversation.response));
      });

      setConversations(savedConversations);
      setIsLoading(false);
    };
    fetchOldConversations();
  }, [currentChatId]);

  const handleSendMessage = async (el: string | null) => {
    let latestPromp = prompt.trim();
    if (el) {
      const req = conversations.slice(-2);
      latestPromp = `
      ${req[0]}
      ${req[1].payload}
      ${el.trim()}
      `;
    }
    if (!latestPromp || !canSendQuery || !currentChatId || !userId) return;
    setConversations((oldConversation) => [
      ...oldConversation,
      el ? el : latestPromp,
      {},
    ]);
    setPrompt("");
    // const iaResponse = await handleCreateConversationAction(
    //   userId,
    //   currentChatId,
    //   latestPromp
    // );
    const iaResponse = {
      type: "question",
      payload:
        "Could you please specify for which semester and year you would like to know the schedule?",
      suggestions: [
        "1st semester 2022-2023",
        "2nd semester 2022-2023",
        "1st semester 2023-2024",
        "2nd semester 2023-2024",
      ],
    };
    fetchMessagesCounter();
    setConversations((oldConversation) => [
      ...oldConversation.slice(0, -1),
      { ...iaResponse, source: IAResponseSourceEnum.local },
    ]);
  };

  if (isLoading || !currentChatId)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader />
      </div>
    );
  return (
    <div className="flex flex-col h-screen bg-base-200 ">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <ConversationFactory
          conversation={conversations}
          setCanSendQuery={setCanSendQuery}
          handleSendMessage={handleSendMessage}
        />
      </div>

      <div className="p-4 bg-base-200 flex items-center ">
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSendMessage(null)}
          placeholder="Type your message..."
          className="flex-1 p-4 rounded-full mr-2 focus:outline-none focus:ring-0"
        />
        <button
          onClick={() => handleSendMessage(null)}
          className="btn btn-secondary"
        >
          {canSendQuery && "Send"}
          {!canSendQuery && <FaPause />}
        </button>
      </div>
    </div>
  );
};

export default Chat;
