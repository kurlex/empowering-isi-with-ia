import { PromptInstructionTypeEnum } from "../../domain/enums/PromptInstructionTypeEnum";
import { IConversationRepository } from "../../domain/interfaces/IConversationRepository";
import { IGPTService } from "../../domain/interfaces/IGPTService";
import { IPromptService } from "../../domain/interfaces/IPromptService";

export class HandleCreateConversationUseCase {
  constructor(
    private gptService: IGPTService,
    private promptService: IPromptService,
    private conversationRepository: IConversationRepository
  ) {}

  async execute(
    userId: string,
    chatId: string,
    request: string
  ): Promise<string | null> {
    const messagesCount =
      await this.conversationRepository.getConversationCountForUser(userId);
    if (messagesCount >= 50) return null;

    const completePrompt = this.promptService.wrapPrompt(
      request,
      PromptInstructionTypeEnum.chat
    );
    const gptResponse = await this.gptService.generateResponse(completePrompt);
    if (gptResponse)
      this.conversationRepository.addChatConversations(
        chatId,
        request,
        gptResponse
      );
    return gptResponse;
  }
}
