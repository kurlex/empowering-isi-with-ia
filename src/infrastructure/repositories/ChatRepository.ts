import { Chat } from "@prisma/client";
import { IChatRepository } from "../../domain/interfaces/IChatRepository";
import prisma from "../prisma/prismaClient";

export class ChatRepository implements IChatRepository {
  getUserChatsOrCreateDefault = async (userId: string): Promise<Chat[]> => {
    console.log("userId", userId);
    const userChats = await prisma.chat.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
    });

    if (userChats.length === 0) {
      const defaultChat = await prisma.chat.create({
        data: {
          name: "default chat",
          userId,
        },
      });
      return [defaultChat];
    }

    return userChats;
  };

  createNewUserChat = async (userId: string, name: string): Promise<Chat> => {
    const newChat = await prisma.chat.create({ data: { name, userId } });
    return newChat;
  };

  updateUserChatName = async (chatId: string, name: string): Promise<Chat> => {
    const updatedChat = await prisma.chat.update({
      where: { id: chatId },
      data: { name },
    });
    return updatedChat;
  };

  deleteUserChat = async (chatId: string): Promise<void> => {
    await prisma.chat.delete({
      where: { id: chatId },
    });
  };
}
