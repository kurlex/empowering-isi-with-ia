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

  const handleSendMessage = async () => {
    if (!prompt.trim() || !canSendQuery || !currentChatId || !userId) return;
    const latestPromp = prompt.trim();
    setConversations((oldConversation) => [
      ...oldConversation,
      latestPromp,
      {},
    ]);
    setPrompt("");
    const iaResponse = await handleCreateConversationAction(
      userId,
      currentChatId,
      latestPromp
    );

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
    <div className="flex flex-col h-screen bg-base-200">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <ConversationFactory
          conversation={conversations}
          setCanSendQuery={setCanSendQuery}
        />
      </div>

      <div className="p-4 bg-base-200 flex items-center">
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
          placeholder="Type your message..."
          className="flex-1 p-4 rounded-full mr-2 focus:outline-none focus:ring-0"
        />
        <button onClick={handleSendMessage} className="btn btn-secondary">
          {canSendQuery && "Send"}
          {!canSendQuery && <FaPause />}
        </button>
      </div>
    </div>
  );
};

export default Chat;
