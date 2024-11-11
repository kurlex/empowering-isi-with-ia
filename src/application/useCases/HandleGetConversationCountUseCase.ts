import { IConversationRepository } from "../../domain/interfaces/IConversationRepository";

export class HandleGetConversationCountUseCase {
  constructor(private conversationRepository: IConversationRepository) {}
  async execute(chatId: string): Promise<number> {
    return await this.conversationRepository.getConversationCountForUser(
      chatId
    );
  }
}
