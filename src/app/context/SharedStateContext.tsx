"use client";

import { Chat } from "@prisma/client";
import React, { ReactNode, useContext, useEffect, useState } from "react";
import { handleGetConversationCountAction } from "../serverActions/HandleGetConversationCountAction";
import { handleGetChatAction } from "../serverActions/HandleGetChatAction";
import supabase from "../lib/supabase/supabaseClient";

interface ISharedState {
  userId: string | undefined;
  email: string | undefined;
  chats: Chat[] | undefined;
  currentChatId: string | undefined;
  messagesCounter: number | undefined;
  setCurrentChatId: any;
  setChats: any;
  resetChats: any;
  fetchMessagesCounter: any;
}
const initialSharedState = {
  userId: undefined,
  email: undefined,
  chats: undefined,
  currentChatId: undefined,
  setCurrentChatId: undefined,
  setChats: undefined,
  resetChats: undefined,
  messagesCounter: undefined,
  fetchMessagesCounter: undefined,
};
const SharedStateContext =
  React.createContext<ISharedState>(initialSharedState);

export const SharedStateContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [sharedState, setSharedState] =
    useState<ISharedState>(initialSharedState);

  const setCurrentChatId = (id: string) => {
    setSharedState((oldSharedState) => ({
      ...oldSharedState,
      currentChatId: id,
    }));
  };

  const resetChats = () => {
    setSharedState((oldSharedState) => ({
      ...oldSharedState,
      chats: undefined,
      currentChatId: undefined,
    }));
  };

  const setChats = (chats: Chat[]) => {
    if (chats.length === 0) return;
    const firstId = chats[0].id;
    setSharedState((oldSharedState) => ({
      ...oldSharedState,
      chats: [...chats],
      currentChatId: firstId,
    }));
  };

  useEffect(() => {
    const fetchSharedStateData = async () => {
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();

      if (error || !session) {
        console.error(
          "Error fetching session:",
          error ? error.message : "session not found"
        );
        return;
      }

      const userId = session.user.id;

      const fetchMessagesCounter = async () => {
        if (!userId) return;
        const messagesCounter = await handleGetConversationCountAction(userId);
        setSharedState((oldSharedState) => ({
          ...oldSharedState,
          messagesCounter,
        }));
      };

      const chats = await handleGetChatAction(userId);
      const messagesCounter = await handleGetConversationCountAction(userId);
      const currentChatId = chats.length > 0 ? chats[0].id : undefined;

      setSharedState({
        userId,
        email: session.user.email ?? "Unknown",
        chats,
        messagesCounter,
        currentChatId,
        setCurrentChatId,
        setChats,
        resetChats,
        fetchMessagesCounter,
      });
    };

    fetchSharedStateData();
  }, []);
  return (
    <SharedStateContext.Provider value={sharedState}>
      {children}
    </SharedStateContext.Provider>
  );
};

export const useSharedStateContext = () => {
  const context = useContext(SharedStateContext);
  if (!context) throw new Error("context is not defined");
  return context;
};
