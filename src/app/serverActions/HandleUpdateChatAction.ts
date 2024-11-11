"use server";
import { handleUpdateChatUseCase } from "../../infrastructure/containers/container";

export const handleUpdateChatAction = async (
  chatId: string,
  newChatName: string
) => await handleUpdateChatUseCase.execute(chatId, newChatName);
