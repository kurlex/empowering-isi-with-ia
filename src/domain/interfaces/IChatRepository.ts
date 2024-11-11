import { Chat } from "@prisma/client";

export interface IChatRepository {
  getUserChatsOrCreateDefault(userId: string): Promise<Chat[]>;

  createNewUserChat(userId: string, name: string): Promise<Chat>;

  updateUserChatName(chatId: string, name: string): Promise<Chat>;

  deleteUserChat(chatId: string): Promise<void>;
}
