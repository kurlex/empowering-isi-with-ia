import { IChatRepository } from "../../domain/interfaces/IChatRepository";
import { IConversationRepository } from "../../domain/interfaces/IConversationRepository";

export class HandleDeleteChatUseCase {
  constructor(
    private chatRepository: IChatRepository,
    private conversationRepository: IConversationRepository
  ) {}
  async execute(chatId: string): Promise<void> {
    await this.conversationRepository.deleteAllChatConversations(chatId);
    await this.chatRepository.deleteUserChat(chatId);
  }
}
