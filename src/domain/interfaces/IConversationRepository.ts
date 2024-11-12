import { Conversation } from "@prisma/client";
import { Prisma } from "@prisma/client";

export interface IConversationRepository {
  getConversationCountForUser(userId: string): Promise<number>;

  getChatConversations(chatId: string): Promise<Conversation[]>;

  addChatConversations(
    chatId: string,
    request: string,
    response: string
  ): Promise<Conversation>;

  deleteAllChatConversations(chatId: string): Promise<void>;

  getUntreatedConversations(): Promise<Conversation[]>;

  updateTreatedConversations(conversationIds: string[]): Promise<void>;
}
