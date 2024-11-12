import { IConversationRepository } from "../../domain/interfaces/IConversationRepository";
import ChatBotService from "../../infrastructure/services/ChatBotService";

export class HandleCreateConversationUseCase {
  constructor(
    private conversationRepository: IConversationRepository,
    private chatBotService: ChatBotService
  ) {}

  async execute(userId: string, chatId: string, request: string): Promise<any> {
    const messagesCount =
      await this.conversationRepository.getConversationCountForUser(userId);
    if (messagesCount >= 50) return null;

    const chatBotServiceResponse = await this.chatBotService.processPrompt(
      request
    );
    if (chatBotServiceResponse)
      this.conversationRepository.addChatConversations(
        chatId,
        request,
        JSON.stringify(chatBotServiceResponse)
      );
    return chatBotServiceResponse;
  }
}
