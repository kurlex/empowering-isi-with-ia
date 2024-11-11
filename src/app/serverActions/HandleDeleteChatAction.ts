"use server";
import { handleDeleteChatUseCase } from "../../infrastructure/containers/container";

export const handleDeleteChatAction = async (chatId: string) =>
  handleDeleteChatUseCase.execute(chatId);
