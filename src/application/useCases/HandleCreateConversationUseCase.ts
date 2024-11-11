import { PromptInstructionTypeEnum } from "../../domain/enums/PromptInstructionTypeEnum";
import { IConversationRepository } from "../../domain/interfaces/IConversationRepository";
import { IGPTService } from "../../domain/interfaces/IGPTService";
import { IPromptService } from "../../domain/interfaces/IPromptService";
import ChatBotService from "../../infrastructure/services/ChatBotService";
import { ChatBotServiceResponseFactoryService } from "../../infrastructure/services/chatBotServiceResponseFactoryService";
import { Prisma } from "@prisma/client";

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
        chatBotServiceResponse.payload,
        { type: chatBotServiceResponse.type }
      );
    return chatBotServiceResponse;
  }
}
