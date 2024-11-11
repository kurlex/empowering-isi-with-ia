import { Chat } from "@prisma/client";
import { IChatRepository } from "../../domain/interfaces/IChatRepository";
import { IOpenAIService } from "../../domain/interfaces/IOpenAIService";

export class HandleCreateChatUseCase {
  constructor(
    private chatRepository: IChatRepository,
    private openAIService: IOpenAIService
  ) {}

  async execute(userId: string, chatName: string): Promise<Chat> {
    return await this.chatRepository.createNewUserChat(userId, chatName);
  }

  async run(message: string): Promise<string> {
    return await this.openAIService.answerQuestion(message);
  }
}
