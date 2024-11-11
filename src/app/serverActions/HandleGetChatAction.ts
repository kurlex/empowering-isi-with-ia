"use server";
import { handleGetChatUserCase } from "../../infrastructure/containers/container";

export const handleGetChatAction = async (userId: string) =>
  await handleGetChatUserCase.execute(userId);
