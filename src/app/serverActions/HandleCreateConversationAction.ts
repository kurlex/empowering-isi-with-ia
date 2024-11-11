"use server";

import { handleCreateConversationUseCase } from "../../infrastructure/containers/container";

export const handleCreateConversationAction = async (
  userId: string,
  chatId: string,
  request: string
) => await handleCreateConversationUseCase.execute(userId, chatId, request);
