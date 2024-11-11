import { Conversation } from "@prisma/client";
import { IConversationRepository } from "../../domain/interfaces/IConversationRepository";
import prisma from "../prisma/prismaClient";

export class ConversationRepository implements IConversationRepository {
  getConversationCountForUser = async (userId: string): Promise<number> => {
    const conversationCount = await prisma.conversation.count({
      where: {
        chat: {
          userId: userId,
        },
      },
    });

    return conversationCount;
  };

  getChatConversations = async (chatId: string): Promise<Conversation[]> => {
    return await prisma.conversation.findMany({
      where: { chatId },
      orderBy: { createdAt: "desc" },
    });
  };

  addChatConversations = async (
    chatId: string,
    request: string,
    response: string,
    metaData: JSON
  ): Promise<Conversation> => {
    return await prisma.conversation.create({
      data: {
        chatId,
        request,
        response,
        metaData
      },
    });
  };

  deleteAllChatConversations = async (chatId: string) => {
    await prisma.conversation.deleteMany({ where: { chatId } });
  };

  getUntreatedConversations = async () => {
    return await prisma.conversation.findMany({
      where: {
        isTreated: false,
      },
    });
  };

  updateTreatedConversations = async (conversationIds: string[]) => {
    await prisma.conversation.updateMany({
      where: {
        id: {
          in: conversationIds,
        },
      },
      data: {
        isTreated: true,
      },
    });
  };
}
