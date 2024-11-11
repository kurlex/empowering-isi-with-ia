import { Conversation } from "@prisma/client";
import { IConversationRepository } from "../../domain/interfaces/IConversationRepository";

export class HandleGetConversationUseCase {
  constructor(private conversationRepository: IConversationRepository) {}
  async execute(chatId: string): Promise<Conversation[]> {
    return await this.conversationRepository.getChatConversations(chatId);
  }
}
