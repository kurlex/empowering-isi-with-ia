"use server";
import { handleGetConversationUseCase } from "../../infrastructure/containers/container";

export const handleGetConversationAction = async (chatId: string) =>
  await handleGetConversationUseCase.execute(chatId);
