"use server";

import { handleCreateChatUseCase } from "../../infrastructure/containers/container";

export const handleCreateChatAction = async (
  userId: string,
  chatName: string
) => await handleCreateChatUseCase.execute(userId, chatName);
