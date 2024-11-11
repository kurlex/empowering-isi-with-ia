"use server";
import { handleGetConversationCountUseCase } from "../../infrastructure/containers/container";

export const handleGetConversationCountAction = async (chatId: string) =>
  await handleGetConversationCountUseCase.execute(chatId);
